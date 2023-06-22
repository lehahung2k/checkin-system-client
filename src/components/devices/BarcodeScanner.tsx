import React, { useEffect } from 'react';


const BarcodeScanner = () => {

    const handleScan = (data: string | null) => {
        console.log('Barcode or QR code detected:', data);

        // Xử lý mã vạch hoặc mã QR được quét ở đây (nếu cần)
        // ...
    };

    return (
        <>
        Barcode scanner
        </>
    );
};

export default BarcodeScanner;
