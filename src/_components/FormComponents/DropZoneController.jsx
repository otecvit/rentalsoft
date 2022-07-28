import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import Dropzone from 'react-dropzone-uploader';

import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import {
    Box,
    Typography,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

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
};

const previewStyle = {
    justifyContent: 'flex-start',
    alignItems: 'center',
    textDecoration: 'none',
    boxSizing: 'border-box',
    textAlign: 'left',
    padding: '0px',
    margin: '4px',
    width: '80px',
    height: '80px',
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
    display: 'inline-flex',
    border: '1px solid rgba(145, 158, 171, 0.24)'
}

const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {
    return (
        <div>
            <div {...dropzoneProps}>
                {files.length < maxFiles && input}
            </div>
            <ImageList sx={{ width: '100%' }} cols={4}>
                {previews.map((preview, index) => (
                    <ImageListItem key={index}>
                        <img
                            src={`${preview.props.meta.previewUrl}`}
                            alt={preview.props.meta.name}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={preview.props.meta.name}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${preview.props.meta.name}`}
                                >
                                    <CloseIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            {files.length > 0 && submitButton}
        </div>
    )
}



const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const text = files.length > 0 ? 'Add more files' : 'Choose files'


    return (
        <label style={baseStyle}>
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
            <input
                style={{ display: 'none' }}
                type="file"
                accept={accept}
                multiple
                onChange={e => {
                    getFilesFromEvent(e).then(chosenFiles => {
                        onFiles(chosenFiles)
                    })
                }}
            />
        </label>
    )
}

export const DropZoneController = ({ name, control, label, InputProps, handleControlledDropzonChangeStatus, initialfiles = "" }) => {

    const [file, setFile] = useState(undefined);

    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }


    return (
        <Controller
            control={control}
            name={name}
            render={({ onChange }) => (
                <Dropzone
                    InputComponent={Input}
                    LayoutComponent={Layout}

                    onChangeStatus={(file, status, allFiles) => {
                        handleControlledDropzonChangeStatus(status, allFiles, onChange);
                    }}
                    getFilesFromEvent={getFilesFromEvent}
                />
            )
            }
        />
    );
};