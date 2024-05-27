import { Scanner as ReactScanner, boundingBox } from '@yudiel/react-qr-scanner';
import { useState, useCallback, useMemo, useEffect } from 'react'

const Scanner = () => {
    //const devices = useDevices();
    const [devices, setDevices] = useState([]);
    const [deviceId, setDeviceId] = useState(undefined);
    const [result, setResult] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const onScanComplete = useCallback((result) => {
        console.log(result);
        setResult(result[0].rawValue)
    }, []);

    useEffect(() => {
        if(devices && !devices.length) {
            navigator.mediaDevices.enumerateDevices().then((inputs) => {
              if (!inputs.length) return;
              const devicesTemp = inputs.filter(
                (device) => device.kind === "videoinput"
              );
              setDevices(devicesTemp);
              setDeviceId(devicesTemp[0].deviceId);
            }); 
        }
    }, [devices])
    

    const formats = useMemo(() => {
      return [
        "qr_code",
        "micro_qr_code",
        "rm_qr_code",
        "maxi_code",
        "pdf417",
        "aztec",
        "data_matrix",
        "matrix_codes",
        "dx_film_edge",
        "databar",
        "databar_expanded",
        "codabar",
        "code_39",
        "code_93",
        "code_128",
        "ean_8",
        "ean_13",
        "itf",
        "linear_codes",
        "upc_a",
        "upc_e",
      ];
    }, []);

  return (
    <>
      <h1>Result- {result}</h1>
      <button onClick={() => setIsScanning(!isScanning)}>
        {!isScanning ? "Stop Scanning" : "Start Scanning"}
      </button>
      <select value={deviceId || devices[0]?.deviceId} onChange={(e) => setDeviceId(e.target.value)}>
        <option value={undefined}>Select a device</option>
        {devices.map((device, index) => (
          <option key={index} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>

      {devices && devices.length > 0 && <ReactScanner
        onScan={onScanComplete}
        allowMultiple={true}
        paused={isScanning}
        styles={{
          // container: {
          //     backgroundColor: 'grey',
          //     borderRadius: '10px',
          // },
          finderBorder: {
            borderColor: "red",
            color: "red",
          },
          // video: {
          //     borderRadius: '10px',
          //     backgroundColor: 'grey',
          // },
        }}
        formats={formats}
        components={{
          audio: true,
          onOff: true,
          torch: true,
          tracker: boundingBox,
        }}
        constraints={{
          deviceId: deviceId,
        }}
        scanDelay={2000}
      />}
    </>
  );
}

export default Scanner