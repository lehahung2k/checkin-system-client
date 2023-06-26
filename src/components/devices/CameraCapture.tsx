import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Grid } from '@mui/material';

interface CameraCaptureProps {
    onCaptureImage: (imageData: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCaptureImage }) => {
    const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
    const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
    const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
    const [capturedImage, setCapturedImage] = useState<string>('');

    const webcamRef = useRef<Webcam>(null);

    const handleCaptureImage = () => {
        if (webcamRef.current) {
            const capturedImage = webcamRef.current.getScreenshot();
            if (capturedImage) {
                setCapturedImage(capturedImage);
                onCaptureImage(capturedImage);
                setIsCameraOn(false); // Stop showing camera video
            }
        }
    };

    useEffect(() => {
        const getCameras = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter((device) => device.kind === 'videoinput');
                setCameras(videoDevices);
                setSelectedCamera(videoDevices[0]?.deviceId || null);
            } catch (error) {
                console.error(error);
                alert('Không thể mở camera, vui lòng kiểm tra thiết bị!');
            }
        };

        getCameras();
    }, []);

    const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDeviceId = event.target.value;
        setSelectedCamera(selectedDeviceId || null);
    };

    const toggleCamera = () => {
        setIsCameraOn((prevIsCameraOn) => !prevIsCameraOn);
    };

    const handleRetakePhoto = () => {
        setCapturedImage('');
        setIsCameraOn(true); // Show camera video again
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
                    {isCameraOn && capturedImage === '' ? (
                        <Webcam ref={webcamRef} audio={false} videoConstraints={{ deviceId: selectedCamera }} width={'100%'} />
                    ) : capturedImage !== '' ? (
                        <img src={capturedImage} alt="Captured" />
                    ) : (
                        <div>Camera đang tắt</div>
                    )}
                </>
            ) : (
                <div>Không có camera nào</div>
            )}
            <br />
            <Grid container justifyContent="space-between" alignItems="flex-end" paddingTop={'1rem'}>
                <Grid item>
                    <button onClick={toggleCamera}>
                        {isCameraOn ? 'Tắt Camera' : 'Bật Camera'}
                    </button>
                </Grid>
                <Grid item>
                    {capturedImage === '' ? (
                        <button disabled={!selectedCamera} onClick={handleCaptureImage}>
                            Chụp ảnh
                        </button>
                    ) : (
                        <button onClick={handleRetakePhoto}>Chụp ảnh mới</button>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CameraCapture;
