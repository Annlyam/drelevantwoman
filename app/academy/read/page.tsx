"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navigation from "@/components/shared/Navigation";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function BookReaderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookPath = searchParams.get("book");
  const bookTitle = searchParams.get("title") || "Book";

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookPath) {
      setTimeout(() => {
        setError("No book specified");
        setLoading(false);
      }, 100);
    }
  }, [bookPath]);

  console.log(bookPath);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    setError("Failed to load PDF. Please try again.");
    setLoading(false);
    console.error("PDF load error:", error);
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(numPages, prev + 1));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(3.0, prev + 0.25));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(0.5, prev - 0.25));
  };

  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const downloadPDF = () => {
    if (bookPath) {
      const link = document.createElement("a");
      link.href = bookPath;
      link.download = `${bookTitle}.pdf`;
      link.click();
    }
  };

  if (!bookPath) {
    return (
      <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
        <Navigation />
        <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-24 h-24 text-white/30 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">
              No Book Selected
            </h1>
            <p className="text-white/60 mb-8">
              Please select a book to read from the Academy page.
            </p>
            <button
              onClick={() => router.push("/academy")}
              className="px-6 py-3 bg-[#fc98ac] text-white rounded-lg font-semibold hover:bg-[#fc98ac]/80 transition-colors"
            >
              Browse Books
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1a0f2e]">
      <Navigation />

      {/* Toolbar */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-[#3a225c]/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Book Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <h1 className="text-lg font-semibold text-white truncate max-w-xs">
                {bookTitle}
              </h1>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Page Navigation */}
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                <button
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                  className="p-1 hover:bg-white/10 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <span className="text-white text-sm px-3">
                  {pageNumber} / {numPages || "..."}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  className="p-1 hover:bg-white/10 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2">
                <button
                  onClick={zoomOut}
                  disabled={scale <= 0.5}
                  className="p-2 hover:bg-white/10 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-5 h-5 text-white" />
                </button>
                <span className="text-white text-sm px-2 min-w-[3rem] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={zoomIn}
                  disabled={scale >= 3.0}
                  className="p-2 hover:bg-white/10 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Rotate */}
              <button
                onClick={rotate}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors bg-white/5"
                aria-label="Rotate"
              >
                <RotateCw className="w-5 h-5 text-white" />
              </button>

              {/* Download */}
              <button
                onClick={downloadPDF}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors bg-white/5"
                aria-label="Download PDF"
              >
                <Download className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="pt-32 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#fc98ac] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/70">Loading book...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-[#fc98ac] text-white rounded-lg font-semibold hover:bg-[#fc98ac]/80 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {!loading && !error && (
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-lg shadow-2xl p-4">
                <Document
                  file={bookPath}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex items-center justify-center min-h-[60vh]">
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#fc98ac] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white/70">Loading PDF...</p>
                      </div>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    rotate={rotation}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="shadow-lg"
                  />
                </Document>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

function BookReaderFallback() {
  return (
    <main className="min-h-screen bg-[#3a225c] overflow-x-hidden">
      <Navigation />
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#fc98ac] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading book reader...</p>
        </div>
      </div>
    </main>
  );
}

export default function BookReader() {
  return (
    <Suspense fallback={<BookReaderFallback />}>
      <BookReaderContent />
    </Suspense>
  );
}
