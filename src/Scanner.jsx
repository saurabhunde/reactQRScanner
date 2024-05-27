import { Scanner as ReactScanner, useDevices } from '@yudiel/react-qr-scanner';
import { useState } from 'react'

const Scanner = () => {
    const devices = useDevices();
    const [selectedDevice, setSelectedDevice] = useState(devices ? devices[0]?.deviceId : null);
    const [result, setResult] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const onScanComplete = (result) => {
        console.log(result);
        setResult(result[0].rawValue)
    }
    // useEffect(() => {
    //   if (!selectedDevice && devices && devices.length > 0) {
    //     setSelectedDevice(devices[0]?.deviceId)
    //   }
    // }, [selectedDevice, devices])
  return (
    <>
      <h1>Result- {result}</h1>
      <button onClick={() => setIsScanning(!isScanning)}>
        {!isScanning ? 'Stop Scanning' : 'Start Scanning'}
      </button>
      <select
        onChange={(e) => setSelectedDevice(e.target.value)}
        value={selectedDevice}
      >
        <option key={undefined} value={undefined}>Select Option</option>
        {devices?.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>

      <ReactScanner
        onScan={onScanComplete}
        allowMultiple={true}
        torch={true}
        paused={selectedDevice && isScanning}
        styles={{
            // container: {
            //     backgroundColor: 'grey',
            //     borderRadius: '10px',
            // },
            finderBorder: {
                borderColor: 'red',
                color: 'red'
            },
            // video: {
            //     borderRadius: '10px',
            //     backgroundColor: 'grey',
            // },
        }}
        formats={[
            'qr_code',
            'micro_qr_code',
            'rm_qr_code',
            'maxi_code',
            'pdf417',
            'aztec',
            'data_matrix',
            'matrix_codes',
            'dx_film_edge',
            'databar',
            'databar_expanded',
            'codabar',
            'code_39',
            'code_93',
            'code_128',
            'ean_8',
            'ean_13',
            'itf',
            'linear_codes',
            'upc_a',
            'upc_e'
        ]}
        components={{
          audio: true,
          onOff: true,
          torch: true,
          tracker: 'boundingBox',
        }}
        constraints={{
            deviceId: selectedDevice
        }}
        scanDelay={2000}
      />
    </>
  );
}

export default Scanner