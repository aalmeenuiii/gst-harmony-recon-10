
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle,
  Trash2,
  Eye,
  Download,
  RefreshCcw
} from "lucide-react";
import { FileData } from "@/pages/GSTReconciliation";

interface DataCleaningPanelProps {
  files: FileData[];
  onCleanData: (fileId: string) => void;
  onDeleteFile: (fileId: string) => void;
  isProcessing: boolean;
}

const DataCleaningPanel: React.FC<DataCleaningPanelProps> = ({ 
  files, 
  onCleanData, 
  onDeleteFile, 
  isProcessing 
}) => {
  const getStatusColor = (status: FileData['status']) => {
    switch (status) {
      case 'uploaded': return 'bg-yellow-100 text-yellow-800';
      case 'cleaned': return 'bg-green-100 text-green-800';
      case 'processed': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: FileData['status']) => {
    switch (status) {
      case 'cleaned': return <CheckCircle2 className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <FileSpreadsheet className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const gstr2aFiles = files.filter(f => f.type === 'gstr2a');
  const invoiceFiles = files.filter(f => f.type === 'invoice');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Data Cleaning & Standardization
          </CardTitle>
          <CardDescription>
            Clean and standardize your data before reconciliation
          </CardDescription>
        </CardHeader>
      </Card>

      {/* GSTR-2A Files Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-blue-600" />
            GSTR-2A Files ({gstr2aFiles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {gstr2aFiles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-300 mb-2" />
              <p>No GSTR-2A files uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {gstr2aFiles.map((file) => (
                <div key={file.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(file.status)}
                      <div>
                        <h4 className="font-medium text-gray-900">{file.originalName}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>{formatFileSize(file.size)}</span>
                          <span>{file.recordCount} records</span>
                          <span>Uploaded: {file.uploadDate.toLocaleDateString()}</span>
                        </div>
                        {file.cleanedVersion && (
                          <p className="text-xs text-green-600 mt-1">
                            Cleaned version: {file.cleanedVersion}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(file.status)}>
                        {file.status.toUpperCase()}
                      </Badge>
                      
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {file.status === 'uploaded' && (
                          <Button 
                            onClick={() => onCleanData(file.id)}
                            disabled={isProcessing}
                            size="sm"
                          >
                            {isProcessing ? (
                              <RefreshCcw className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Settings className="h-4 w-4 mr-1" />
                                Clean Data
                              </>
                            )}
                          </Button>
                        )}
                        
                        {file.cleanedVersion && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onDeleteFile(file.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoice Files Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-green-600" />
            Invoice Files ({invoiceFiles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invoiceFiles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-300 mb-2" />
              <p>No Invoice files uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {invoiceFiles.map((file) => (
                <div key={file.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(file.status)}
                      <div>
                        <h4 className="font-medium text-gray-900">{file.originalName}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>{formatFileSize(file.size)}</span>
                          <span>{file.recordCount} records</span>
                          <span>Uploaded: {file.uploadDate.toLocaleDateString()}</span>
                        </div>
                        {file.cleanedVersion && (
                          <p className="text-xs text-green-600 mt-1">
                            Cleaned version: {file.cleanedVersion}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(file.status)}>
                        {file.status.toUpperCase()}
                      </Badge>
                      
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {file.status === 'uploaded' && (
                          <Button 
                            onClick={() => onCleanData(file.id)}
                            disabled={isProcessing}
                            size="sm"
                          >
                            {isProcessing ? (
                              <RefreshCcw className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Settings className="h-4 w-4 mr-1" />
                                Clean Data
                              </>
                            )}
                          </Button>
                        )}
                        
                        {file.cleanedVersion && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onDeleteFile(file.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Cleaning Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h4 className="font-medium text-blue-900">Data Cleaning Process</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Remove duplicate entries and standardize formats</li>
              <li>• Validate GSTIN numbers and correct common errors</li>
              <li>• Standardize date formats and currency values</li>
              <li>• Handle missing data and normalize text fields</li>
              <li>• Generate cleaned files with "_cleaned" suffix</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataCleaningPanel;
