import { createTheme, styled } from "@mui/material";


const customTheme = createTheme({
    components: {
        MuiPaper: {
            variants: [
                {
                    props: { variant: 'main' },
                    style: {
                        boxShadow:
                            "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
                        borderRadius: 16,
                        padding: 24,
                    }
                },

                {
                    props: { variant: 'mainMargin' },
                    style: {
                        margin: "24px 0px 0px",
                        boxShadow:
                            "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
                        borderRadius: 16,
                        padding: 24,
                    }
                },
                {
                    props: { variant: 'mainMarginNoPadding' },
                    style: {
                        margin: "30px 0px 0px",
                        boxShadow:
                            "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
                        borderRadius: 16,
                        padding: 0,
                    }
                },

                {
                    props: { variant: 'titleTabDatagrid' },
                    style: {
                        backgroundColor: 'rgb(244, 246, 248)',
                        boxShadow: 'none',
                        borderRadius: '16px 16px 0px 0px',
                    }
                },
                {
                    props: { variant: 'titleTabDatagridWhite' },
                    style: {
                        backgroundColor: 'rgb(255, 255, 255)',
                        boxShadow: 'none',

                    }
                },
                {
                    props: { variant: 'mainNoneBorder' },
                    style: {
                        boxShadow: 'none',
                        border: 'none',
                        padding: 24,
                    }
                },
                {
                    props: { contentalign: 'center' },
                    style: {
                        textAlign: 'center',
                    }
                }
            ],

        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: '16px',
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '0 24px 24px 24px',
                }
            }
        },
        MuiBreadcrumbs: {
            styleOverrides: {
                root: {
                    fontSize: '0.8rem'
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize',
                    color: 'rgb(99, 115, 129)',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    '&:focus': {
                        outline: 0,
                        border: 0,
                    },
                    "&.Mui-selected": {
                        color: 'rgb(33, 43, 54)',
                    }
                },
                labelIcon: {
                    minHeight: '50px',
                }

            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:focus': {
                        outline: 0,
                        border: 0,
                    }
                }
            }
        },
        MuiAvatar: {
            variants: [
                {
                    props: { variant: "avatartable" },
                    style: {
                        borderRadius: '12px',
                        marginRight: '16px',
                    }
                }
            ]
        },

        MuiButton: {
            variants: [
                {
                    props: { themecolor: "rentalTheme" },
                    style: {
                        textTransform: 'capitalize',
                        fontWeight: '700',
                        borderRadius: '8px',
                        backgroundColor: 'rgb(223, 227, 232)',
                        color: 'rgb(33, 43, 54)',
                        boxShadow: 'rgb(145 158 171 / 16%) 0px 8px 16px 0px',
                        width: '100%',
                        height: '100%',
                        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        '&:hover': {
                            backgroundColor: 'rgb(196, 205, 213)',
                            boxShadow: 'none',
                        },
                        '&:active': {
                            boxShadow: 'rgb(145 158 171 / 20%) 0px 5px 5px -3px, rgb(145 158 171 / 14%) 0px 8px 10px 1px, rgb(145 158 171 / 12%) 0px 3px 14px 2px'
                        },
                        '&:focus': {
                            outline: 0,
                            border: 0,
                        }
                    }
                },
                {
                    props: { themecolor: "rentalThemeSubmit" },
                    style: {
                        textTransform: 'capitalize',
                        fontWeight: '700',
                        borderRadius: '8px',
                        backgroundColor: 'rgb(32, 101, 209)',
                        color: 'rgb(255, 255, 255)',
                        boxShadow: 'rgb(32 101 209 / 24%) 0px 8px 16px 0px',
                        width: '100%',
                        height: '100%',
                        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        '&:hover': {
                            backgroundColor: 'rgb(16, 57, 150)',
                            boxShadow: 'none',
                        },
                        '&:active': {
                            boxShadow: 'rgb(145 158 171 / 20%) 0px 5px 5px -3px, rgb(145 158 171 / 14%) 0px 8px 10px 1px, rgb(145 158 171 / 12%) 0px 3px 14px 2px'
                        },
                        '&:focus': {
                            outline: 0,
                            border: 0,
                        }
                    }
                },
                {
                    props: { themecolor: "rentalThemeDelete" },
                    style: {
                        textTransform: 'capitalize',
                        fontWeight: '700',
                        borderRadius: '8px',
                        backgroundColor: 'rgb(255, 72, 66)',
                        color: 'rgb(255, 255, 255)',
                        boxShadow: 'rgb(255 72 66 / 24%) 0px 8px 16px 0px',
                        width: '100%',
                        height: '100%',
                        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        '&:hover': {
                            backgroundColor: 'rgb(183, 33, 54)',
                            boxShadow: 'none',
                        },
                        '&:active': {
                            boxShadow: 'rgb(145 158 171 / 20%) 0px 5px 5px -3px, rgb(145 158 171 / 14%) 0px 8px 10px 1px, rgb(145 158 171 / 12%) 0px 3px 14px 2px'
                        },
                        '&:focus': {
                            outline: 0,
                            border: 0,
                        }
                    }
                },
                {
                    props: { themecolor: "rentalBtnSmall" },
                    style: {
                        textTransform: 'capitalize',
                        color: 'rgb(255, 255, 255)',
                        minWidth: '64px',
                        fontWeight: '700',
                        lineHeight: '1.71429',
                        fontSize: '0.875rem',
                        padding: '6px 16px',
                        borderRadius: '8px',
                        backgroundColor: 'rgb(32, 101, 209)',
                        boxShadow: 'rgb(32 101 209 / 24%) 0px 8px 16px 0px',
                        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        '&:hover': {
                            backgroundColor: 'rgb(16, 57, 150)',
                            boxShadow: 'none',
                        },
                        '&:active': {
                            boxShadow: 'rgb(145 158 171 / 20%) 0px 5px 5px -3px, rgb(145 158 171 / 14%) 0px 8px 10px 1px, rgb(145 158 171 / 12%) 0px 3px 14px 2px'
                        },
                        '&:focus': {
                            outline: 0,
                            border: 0,
                        }
                    }
                },
                {
                    props: { themecolor: "rentalThemeCancel" },
                    style: {
                        textTransform: 'capitalize',
                        fontWeight: '700',
                        borderRadius: '8px',
                        border: '1px solid rgba(145, 158, 171, 0.32)',
                        backgroundColor: 'rgb(255, 255, 255)',
                        color: 'rgb(33, 43, 54)',
                        boxShadow: 'none',
                        width: '100%',
                        height: '100%',
                        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        '&:hover': {
                            backgroundColor: 'rgba(145, 158, 171, 0.08)',
                            boxShadow: 'none',
                        },
                        '&:active': {
                            boxShadow: 'none'
                        },
                        '&:focus': {
                            outline: 0,
                            border: 0,
                        }
                    }
                },
                {
                    props: { themecolor: "rentalBtnAutocomplete" },
                    style: {
                        textTransform: 'capitalize',
                        color: 'rgb(255, 255, 255)',
                        minWidth: '64px',
                        fontWeight: '400',
                        lineHeight: '1.60',
                        fontSize: '0.675rem',
                        padding: '3px 9px',
                        borderRadius: '8px',
                        backgroundColor: 'rgb(32, 101, 209)',
                        boxShadow: 'rgb(32 101 209 / 24%) 0px 8px 16px 0px',
                        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        '&:hover': {
                            backgroundColor: 'rgb(16, 57, 150)',
                            boxShadow: 'none',
                        },
                        '&:active': {
                            boxShadow: 'rgb(145 158 171 / 20%) 0px 5px 5px -3px, rgb(145 158 171 / 14%) 0px 8px 10px 1px, rgb(145 158 171 / 12%) 0px 3px 14px 2px'
                        },
                        '&:focus': {
                            outline: 0,
                            border: 0,
                        }
                    }
                },
                {
                    props: {themecolor: "rentalThemeHeader"},
                    style: {
                        textTransform: 'unset',
                        color: 'rgb(99, 115, 129)',
                        minWidth: '64px',
                        fontWeight: '600',
                        lineHeight: '1.60',
                        fontSize: '0.875rem',
                        padding: '6px 16px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(145, 158, 171, 0.08)',
                        boxShadow: 'none',
                        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        '&:hover': {
                            backgroundColor: 'rgba(145, 158, 171, 0.24)',
                            boxShadow: 'none',
                        },
                        '&:active': {
                            boxShadow: 'none'
                        },
                        '&:focus': {
                            outline: 0,
                            border: 0,
                        }
                    }
                },

            ]
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgb(244, 246, 248)',
                    fontWeight: 700,
                    color: 'rgb(99, 115, 129)',

                }
            }
        },

        MuiTableSortLabel: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                    '&:hover': {
                        color: 'inherit',
                    },
                    '&:active': {
                        color: 'inherit',
                    },
                    '&:focus': {
                        color: 'inherit',
                    }
                }
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: 'none',
                    fontWeight: 'inherit',
                    color: 'inherit',
                    '&:hover': {
                        color: 'inherit',
                    },
                    '&:active': {
                        color: 'inherit',
                    },
                    '&:focus': {
                        color: 'inherit',
                    }
                },
                head: {
                    '&:hover': {
                        color: 'rgb(33, 43, 54)',
                    },
                    '&:active': {
                        color: 'rgb(33, 43, 54)',
                    },
                    '&:focus': {
                        color: 'rgb(33, 43, 54)',
                    }
                }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {

                    borderLeft: `1px solid rgb(221, 225, 227)`,
                    borderRight: `1px solid rgb(221, 225, 227)`,
                    borderTop: 0,
                    borderBottom: 0,
                    '&:first-of-type': {
                        borderTop: `1px solid rgb(221, 225, 227)`,
                    },

                    '&:before': {
                        display: 'none',
                    },
                    boxShadow: 'none',

                    '&.Mui-expanded': {
                        margin: '0px',
                        borderBottom: `1px solid rgb(221, 225, 227)`,
                    },
                }
            }
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid rgb(221, 225, 227)',
                    //borderBottom: '0',
                    minHeight: 50,
                    maxHeight: 50,
                    '&.Mui-expanded': {
                        minHeight: 50,
                        maxHeight: 50,
                    },
                }
            }
        },
        MuiFormControl: {
            variants: [
                {
                    props: { variant: 'mains' },
                    style: {
                        marginTop: 24,
                    }
                }

            ]
        },
        MuiInputBase: {
            styleOverrides: {
                input: {

                },
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            }
        },
        MuiTypography: {
            styleOverrides: {
                body2: {
                    margin: '0px 0px 8px',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: 'rgb(99, 115, 129)',
                },
                body3: {
                    margin: '0px 0px 8px',
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    color: 'rgb(99, 115, 129)',
                },
                h4: {
                    margin: '0px 0px 8px',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: 'rgb(33, 43, 54)',
                },
                subtitle2: {
                    margin: '0px',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: 'rgb(33, 43, 54)',
                }
            },
        },
        MuiMenuItem: {
            variants: [
                {
                    props: {
                        variant: 'datagridmenu',
                    },
                    style: {
                        color: 'rgb(33, 43, 54)',
                        '&:hover': {
                            borderRadius: '6px',
                        },

                    },
                },
                {
                    props: {
                        variant: 'datagridmenu',
                        color: 'red',
                    },
                    style: {
                        color: 'rgb(255, 72, 66)',
                    }
                }
            ]
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderBottom: "1px solid rgba(145, 158, 171, 0.32)",
                }
            }
        },
        MUIRichTextEditor: {
            styleOverrides: {
                root: {
                },
                container: {
                    margin: 0,
                },
                toolbar: {
                    borderBottom: "1px solid rgba(145, 158, 171, 0.32)",
                    padding: 8,
                },
                placeHolder: {
                    paddingLeft: 20,
                    paddingTop: 10,
                    minHeight: 200,

                },
                editor: {
                    paddingLeft: 20,
                    paddingTop: 10,
                    minHeight: 200,
                },
            }
        },

    }
});

export default customTheme;