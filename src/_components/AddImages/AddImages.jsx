import React, { useCallback, useState, useEffect, Fragment } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Box,
    Typography,
    Paper,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar
} from '@mui/material';
import { Cancel } from '@mui/icons-material';

import UploadLogo from '../../image/icons/upload.svg';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 8px',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgba(145, 158, 171, 0.32)',
    borderStyle: 'dashed',
    backgroundColor: 'rgb(244, 246, 248)',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    width: '100%',
    cursor: 'pointer',
    boxShadow: 'none',
};


const AddImages = (props) => {

    const {
        initialfiles,
        handleControlledDropzone,
        handleDeleteFile
    } = props;

    const [files, setFiles] = useState(initialfiles);

    useEffect(() => {
        setFiles(initialfiles)
    }, [initialfiles])

    const onDrop = useCallback((acceptedFiles) => {
        // добавляем файлы в state не удаляя предыдущие
        setFiles(prev => [...prev, ...acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))]);
        handleControlledDropzone(acceptedFiles);
    }, []);

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDrop,
        accept: "image/jpg, image/jpeg, image/png"
    });

    // удаляем изображение
    const handleDelete = (index, preview) => {

        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        handleDeleteFile(newFiles, preview);



    };

    const ImagesList = () => {
        return (
            <ImageList
                rowHeight={150}
                sx={{
                    mt: files.length ? 2 : 0,
                    '&.MuiImageList-root': {
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(150px, 1fr))!important',
                        marginBottom: '0px',
                    },
                }}
            >
                {files.map((image, index) => (
                    <ImageListItem
                        key={index}
                        cols={1}
                        rows={1}
                    >
                        <img
                            src={image.preview}
                            style={{ height: '100%' }}
                        // onLoad={() => { URL.revokeObjectURL(image.preview) }}
                        />
                        <ImageListItemBar
                            position="top"
                            sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                            }}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'white' }}
                                    onClick={() => handleDelete(index, image.preview)}
                                >
                                    <Cancel />
                                </IconButton>
                            }
                        ></ImageListItemBar>
                    </ImageListItem>
                ))}

            </ImageList>

        )
    };

    return (
        <>
            <Paper style={baseStyle}  {...getRootProps()}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ width: 220 }}>
                        <img src={UploadLogo} alt="upload logo" />
                    </Box>
                    <Box sx={{ paddingLeft: '24px' }}>
                        <Typography variant="h5">
                            Drop or Select file
                        </Typography>
                        <Typography variant="body2">
                            Drop files here or click browse thorough your machine
                        </Typography>
                    </Box>
                </div>
                <input {...getInputProps()} />
            </Paper>
            <ImagesList />
        </>
    );
}

export default AddImages;