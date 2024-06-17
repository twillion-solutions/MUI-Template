import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation } from "react-router-dom";
import { Typography, ThemeProvider } from "@mui/material";
import { useSelector } from 'react-redux';
import ThemeOne from '../Theme/Theme1/theme1'; 
import ThemeTwo from '../Theme/Theme2/theme2'; 

const SidebarItems = ({ link, navigate, open }) => {
    const location = useLocation();
    const { currentTheme } = useSelector((state) => state.auth);
    const selectedTheme = currentTheme !== 'ThemeOne' ? ThemeOne : ThemeTwo;

    const matchRoute = (path) => {
        return location.pathname === path;
    };

    return (
        <ThemeProvider theme={selectedTheme}>
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
                            backgroundColor: selectedTheme.palette.action.hover,
                            borderLeft: `2px solid ${selectedTheme.palette.text.primary}`,
                            marginLeft: "5px",
                        },
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        backgroundColor: matchRoute(link.path) ? selectedTheme.palette.background.default : 'inherit',
                        borderLeft: matchRoute(link.path) ? `2px solid ${selectedTheme.palette.text.primary}` : `2px solid ${selectedTheme.palette.background.paper}`,
                        marginLeft: '5px',
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 2 : "auto",
                            justifyContent: "center",
                            color: matchRoute(link.path) ? selectedTheme.palette.text.primary : selectedTheme.palette.text.primary,
                        }}
                    >
                        {link.icon}
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }} >
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: selectedTheme.palette.text.primary, fontSize: '14px' }}>
                            {link.title}
                        </Typography>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        </ThemeProvider>
    );
};

export default SidebarItems;
