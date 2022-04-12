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
                }
            ]
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
                }
            },
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
        }
    }
});

export default customTheme;