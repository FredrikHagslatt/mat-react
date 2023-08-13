import React, { useState, useEffect } from "react";
//import UploadService from "../services/FileUploadService";
/*
const ImageUpload = () => {

    const [currentFile, setCurrentFile] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [imageInfos, setImageInfos] = useState([]);

    const selectFile = (event) => {
        setCurrentFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setProgress(0);
        setMessage("")
    }

    const upload = () => {
        setProgress(0);

        UploadService.upload(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage(response.data.message);
                return UploadService.getFiles();
            })
            .then((files) => {
                setImageInfos(files.data);
            })
            .catch((err) => {
                setProgress(0);

                if (err.response && err.response.data && err.response.data.message) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage("Could not upload the Image!");
                }

                setCurrentFile(undefined);
            });
    };

    return (
        null;
  );
};

export default ImageUpload;
*/
