import { useState, useRef } from 'react';
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
                <div className="lessonPDFCanvas">
                    <Document
                        file={url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="pdfDocument"
                    >
                        <Page
                            pageNumber={pageNumber}
                            onLoadSuccess={onPageLoadSuccess}
                            inputRef={pageRef}
                            className="pdfPage"
                        />
                    </Document>
                </div>
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
