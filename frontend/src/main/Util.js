let Util = (function () {
    
    return {
        base64ToArrayBuffer(base64) {
            var binaryString = window.atob(base64);
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var i = 0; i < binaryLen; i++) {
               var ascii = binaryString.charCodeAt(i);
               bytes[i] = ascii;
            }
            return bytes;
        },
        fileDownload(data) {
            //data format is
            /*
            {
                fileType: string
                filename: string
                file: byte array with base64
            }
            */
            const byte = Util.base64ToArrayBuffer(data.file);
            let blob = new Blob([byte], { type: data.fileType });
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = data.filename;
            link.click();
        }
    };
})();

export default Util;