
import React, { useCallback, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileSpreadsheet, 
  AlertCircle,
  CheckCircle2,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FileData } from "@/pages/GSTReconciliation";

interface FileUploadSectionProps {
  onFileUpload: (files: FileData[]) => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<File[]>([]);
  const { toast } = useToast();

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Only Excel (.xlsx, .xls) and CSV files are allowed' };
    }
    
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      return { valid: false, error: 'File size must be less than 50MB' };
    }
    
    return { valid: true };
  };

  const processFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: FileData[] = [];
    const errors: string[] = [];

    fileArray.forEach((file, index) => {
      const validation = validateFile(file);
      
      if (validation.valid) {
        const fileData: FileData = {
          id: `${Date.now()}_${index}`,
          name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
          originalName: file.name,
          type: file.name.toLowerCase().includes('gstr') ? 'gstr2a' : 'invoice',
          size: file.size,
          uploadDate: new Date(),
          status: 'uploaded',
          recordCount: Math.floor(Math.random() * 1000) + 100, // Simulated
          data: [] // In real app, this would contain parsed data
        };
        validFiles.push(fileData);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });

    if (errors.length > 0) {
      toast({
        title: "Upload Errors",
        description: errors.join(', '),
        variant: "destructive",
      });
    }

    if (validFiles.length > 0) {
      onFileUpload(validFiles);
    }
  }, [onFileUpload, toast]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            File Upload
          </CardTitle>
          <CardDescription>
            Upload your GSTR-2A and Invoice files for reconciliation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GSTR-2A Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                GSTR-2A Files
              </h3>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">
                    Drop GSTR-2A files here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports: .xlsx, .xls, .csv (Max: 50MB)
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileInput}
                  className="hidden"
                  id="gstr2a-upload"
                />
                <Button
                  onClick={() => document.getElementById('gstr2a-upload')?.click()}
                  className="mt-4"
                >
                  Browse Files
                </Button>
              </div>
            </div>

            {/* Invoice Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
                Invoice Files
              </h3>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">
                    Drop Invoice files here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports: .xlsx, .xls, .csv (Max: 50MB)
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileInput}
                  className="hidden"
                  id="invoice-upload"
                />
                <Button
                  onClick={() => document.getElementById('invoice-upload')?.click()}
                  className="mt-4"
                >
                  Browse Files
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-blue-900">Upload Guidelines</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Ensure files contain proper GST data with required columns</li>
                  <li>• GSTR-2A files should include GSTIN, Invoice Number, Date, Amount</li>
                  <li>• Invoice files should include corresponding transaction details</li>
                  <li>• Files will be automatically validated and errors will be reported</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploadSection;
