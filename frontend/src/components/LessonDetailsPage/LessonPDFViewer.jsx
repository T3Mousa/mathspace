// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';


// function LessonPDFViewer({ url }) {

//     pdfjs.GlobalWorkerOptions.workerSrc =
//         `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);

//     /*To Prevent right click on screen*/
//     document.addEventListener("contextmenu", (event) => {
//         event.preventDefault();
//     });

//     /*When document gets loaded successfully*/
//     function onDocumentLoadSuccess({ numPages }) {
//         setNumPages(numPages);
//         setPageNumber(1);
//     }

//     function changePage(offset) {
//         setPageNumber(prevPageNumber => prevPageNumber + offset);
//     }

//     function previousPage() {
//         changePage(-1);
//     }

//     function nextPage() {
//         changePage(1);
//     }

//     return (
//         <>
//             <div className="main">
//                 <Document
//                     file={url}
//                     onLoadSuccess={onDocumentLoadSuccess}
//                 >
//                     <Page pageNumber={pageNumber} />
//                 </Document>
//                 <div>
//                     <div className="pagec">
//                         Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
//                     </div>
//                     <div className="buttonc">
//                         <button
//                             type="button"
//                             disabled={pageNumber <= 1}
//                             onClick={previousPage}
//                             className="Pre"

//                         >
//                             Previous
//                         </button>
//                         <button
//                             type="button"
//                             disabled={pageNumber >= numPages}
//                             onClick={nextPage}

//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default LessonPDFViewer;

import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './LessonPDFViewer.css'; // Import CSS file for styling

function LessonPDFViewer({ url }) {
    pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const pageRef = useRef();

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    function onPageLoadSuccess({ height }) {
        pageRef.current.style.height = `${height}px`;
    }

    return (
        <>
            <div className="lessonPDFViewerContainer">
                <Document
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page
                        pageNumber={pageNumber}
                        onLoadSuccess={onPageLoadSuccess}
                        inputRef={pageRef}
                    />
                </Document>
            </div>
            <div className="pageNavigation">
                <span>
                    Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                </span>
                <div className="buttonContainer">
                    <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default LessonPDFViewer;
