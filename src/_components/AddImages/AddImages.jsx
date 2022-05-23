import React, { useCallback, useState, useEffect, Fragment } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Paper,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar
} from '@mui/material';
import { Cancel } from '@mui/icons-material';

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
        // отправляем новый массив и путь к удаляемому файлу
        handleDeleteFile(newFiles, preview);
    };

    const ImagesList = () => {
        return (
            <ImageList
                rowHeight={150}
                sx={{
                    '&.MuiImageList-root': {
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(150px, 1fr))!important',
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

    // useEffect(() => {
    //     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    //     return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    // }, []);

    return (
        <>
            <Paper
                sx={{
                    cursor: 'pointer',
                    background: '#fafafa',
                    color: '#bdbdbd',
                    border: '1px dashed #ccc',
                    '&:hover': { border: '1px solid #ccc' },
                }}
            >
                <div style={{ padding: '16px' }} {...getRootProps()} >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p style={{ color: 'green' }}>Drop the files here...</p>
                    ) : (
                        <p>Drag 'n' Drop some files here, or click to select files</p>
                    )}
                    <em>(images with *.jpeg, *.png, *.jpg extension will be accepted)</em>
                </div>
            </Paper>
            <ImagesList />
        </>
    );
}

export default AddImages;