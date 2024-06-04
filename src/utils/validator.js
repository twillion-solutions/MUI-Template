import Joi from 'joi-browser';

const extendJoi = (Joi) => {
  Joi.validateToPlainErrors = function (val, schema) {
    if (!schema) {
      return null;
    }
    const result = Joi.validate(val, schema, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (typeof val === 'object' && val != null) {
      let errors = {};
      if (result.error && result.error.details && result.error.details.length) {
        for (let i = 0; i < result.error.details.length; i++) {
          const key = result.error.details[i].path[0];
          const msg = result.error.details[i].message;
          if (!errors[key]) {
            errors[key] = [msg];
          } else {
            errors[key].push(msg);
          }
        }
      }
      return errors;
    } else {
      let error = [];
      if (result.error && result.error.details && result.error.details.length) {
        for (let i = 0; i < result.error.details.length; i++) {
          error.push(result.error.details[i].message);
        }
      }
      return error.length ? error : null;
    }
  };

  Joi.hasPlainError = function (error) {
    if (typeof error === 'object' && error != null) {
      let hasError = false;
      for (let key in error) {
        if (error.hasOwnProperty(key)) {
          if (error[key]) {
            if (Array.isArray(error[key])) {
              for (let i = 0; i < error[key].length; i++) {
                if (error[key][i]) {
                  hasError = true;
                  break;
                }
              }
            } else if (typeof error[key] === 'string') {
              hasError = true;
            }
          }
        }
        if (hasError) {
          break;
        }
      }
      return hasError;
    } else {
      return false;
    }
  };

  Joi.getFirstPlainError = function (error, key) {
    if (typeof error === 'object' && error != null) {
      if (error.hasOwnProperty(key)) {
        if (Array.isArray(error[key])) {
          if (error[key].length) {
            return error[key][0];
          } else {
            return null;
          }
        } else {
          return error[key];
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  Joi.getPlainErrorsAsArray = function (errors) {
    const plainErrors = [];

    if (typeof errors === 'object' && errors != null) {
      for (let key in errors) {
        if (errors.hasOwnProperty(key)) {
          if (errors[key]) {
            if (Array.isArray(errors[key])) {
              for (let i = 0; i < errors[key].length; i++) {
                if (errors[key][i]) {
                  plainErrors.push(errors[key][i]);
                }
              }
            } else if (typeof errors[key] === 'string') {
              plainErrors.push(errors[key]);
            }
          }
        }
      }
    } else {
      return [];
    }

    return plainErrors;
  };

  return Joi;
};

export default extendJoi(Joi);
