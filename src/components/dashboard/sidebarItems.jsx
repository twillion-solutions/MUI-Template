import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation } from "react-router-dom";

const SiderbarItems = ({ link, navigate, open }) => {
    const location = useLocation();

    const matchRoute = (path) => {
        return location.pathname === path;
    }

    return (
        <React.Fragment>
            <ListItem
                key={link.id}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                    navigate(`${link.path}`);
                }}
            >
                <ListItemButton
                    sx={{
                        "&:hover": {
                            backgroundColor: "#e8e8e8",
                            borderLeft: "2px solid #757575",
                            marginLeft: "5px",
                        },
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        backgroundColor: matchRoute(link.path) ? '#e8e8e8' : 'inherit',
                        borderLeft: matchRoute(link.path) ? '2px solid #757575' : 'inherit',
                        marginLeft: matchRoute(link.path) ? '5px' : 'inherit',
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                        }}
                    >
                        {link.icon}
                    </ListItemIcon>

                    <ListItemText primary={link.title} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        </React.Fragment>
    );
};

export default SiderbarItems;
