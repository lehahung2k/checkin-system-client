import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Grid, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CameraCaptureProps {
    onCaptureImage: (imageData: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCaptureImage }) => {
    const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
    const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const webcamRef = useRef<Webcam>(null);

    useEffect(() => {
        const getCameras = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter((device) => device.kind === 'videoinput');
                setCameras(videoDevices);
                setSelectedCamera(videoDevices[0]?.deviceId || null);
            } catch (error) {
                console.error(error);
                toast.error('Không thể mở camera, vui lòng kiểm tra thiết bị!');
            }
        };

        const requestCameraPermission = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true });
                // Permission granted, get the available cameras
                getCameras();
            } catch (error) {
                console.error(error);
                toast.error('Không thể truy cập camera, vui lòng cho phép truy cập!');
            }
        };

        requestCameraPermission();
    }, []);

    const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDeviceId = event.target.value;
        setSelectedCamera(selectedDeviceId || null);
    };

    const toggleCamera = () => {
        setSelectedCamera((prevSelectedCamera) => {
            const newCameraState = prevSelectedCamera ? null : (cameras[0]?.deviceId || null);
            return newCameraState;
        });
    };

    const handleCaptureImage = () => {
        if (webcamRef.current) {
            const capturedImageData = webcamRef.current.getScreenshot();
            if (capturedImageData) {
                setCapturedImage(capturedImageData);
                onCaptureImage(capturedImageData);
            }
        }
    };

    const handleRetakePhoto = () => {
        setCapturedImage(null);
    };

    return (
        <Grid container>
            <label htmlFor="camera-select">Chọn thiết bị: </label>
            <select id="camera-select" value={selectedCamera || ''} onChange={handleCameraChange}>
                {cameras.map((camera) => (
                    <option key={camera.deviceId} value={camera.deviceId}>
                        {camera.label}
                    </option>
                ))}
            </select>
            <br />
            {selectedCamera ? (
                <>
                    {capturedImage === null ? (
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            videoConstraints={{ deviceId: selectedCamera }}
                            width={'100%'}
                        />
                    ) : (
                        <img src={capturedImage} alt="Captured" width={'100%'} />
                    )}
                </>
            ) : (
                <div>Không có camera nào</div>
            )}
            <br />
            <Grid container justifyContent="space-between" alignItems="flex-end" sx={{ paddingTop: '1rem' }}>
                <Grid item>
                    <Button onClick={toggleCamera} color="secondary" variant="outlined">
                        {selectedCamera ? 'Tắt Camera' : 'Bật Camera'}
                    </Button>
                </Grid>
                <Grid item>
                    {capturedImage === null ? (
                        <Button disabled={!selectedCamera} onClick={handleCaptureImage} color="secondary" variant="outlined">
                            Chụp ảnh
                        </Button>
                    ) : (
                        <Button onClick={handleRetakePhoto} color="secondary" variant="outlined">
                            Chụp ảnh mới
                        </Button>
                    )}
                </Grid>
            </Grid>
            <ToastContainer />
        </Grid>
    );
};

export default CameraCapture;
