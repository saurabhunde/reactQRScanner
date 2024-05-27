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

    const fetchDevices = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const inputs = await navigator.mediaDevices.enumerateDevices();
        console.log("devices---> ", inputs);
        if (!inputs.length) {
          throw new Error("No devices found.");
        }
        const devicesTemp = inputs.filter(
          (device) => device.kind === "videoinput"
        );

        const deviceList = document.getElementById("deviceList");
        if (deviceList.options.length === 1) {
          const options = devicesTemp.map((device) => {
            const option = document.createElement("option");
            option.value = device.deviceId;
            option.textContent = device.label;
            return option;
          });
          deviceList.appendChild(...options);
        }

        setDevices(devicesTemp);
        setDeviceId(devicesTemp[0].deviceId);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
      
    useEffect(() => {
        if(devices && !devices.length) {
            fetchDevices()
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
      <select id={"deviceList"} onChange={(e) => setDeviceId(e.target.value)}>
        <option value={undefined}>Select a device</option>
        {/* {devices.map((device, index) => (
          <option key={index} value={device.deviceId}>
            {device.label}
          </option>
        ))} */}
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
          facingMode: "environment",
        }}
        scanDelay={2000}
      />}
    </>
  );
}

export default Scanner