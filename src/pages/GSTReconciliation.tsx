
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileSpreadsheet, 
  Settings, 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  RefreshCcw,
  Trash2,
  Eye
} from "lucide-react";
import FileUploadSection from "@/components/gst/FileUploadSection";
import DataCleaningPanel from "@/components/gst/DataCleaningPanel";
import ReconciliationEngine from "@/components/gst/ReconciliationEngine";
import Dashboard from "@/components/gst/Dashboard";
import ReportsSection from "@/components/gst/ReportsSection";
import { useToast } from "@/hooks/use-toast";

export interface FileData {
  id: string;
  name: string;
  originalName: string;
  type: 'gstr2a' | 'invoice';
  size: number;
  uploadDate: Date;
  status: 'uploaded' | 'cleaned' | 'processed' | 'error';
  recordCount: number;
  cleanedVersion?: string;
  data?: any[];
  errors?: string[];
}

export interface ReconciliationResult {
  id: string;
  timestamp: Date;
  gstr2aFile: string;
  invoiceFile: string;
  matchedRecords: number;
  unmatchedRecords: number;
  variances: any[];
  status: 'completed' | 'failed' | 'processing';
  reportPath?: string;
}

const GSTReconciliation = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [reconciliationResults, setReconciliationResults] = useState<ReconciliationResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  const handleFileUpload = (uploadedFiles: FileData[]) => {
    setFiles(prev => [...prev, ...uploadedFiles]);
    toast({
      title: "Files Uploaded Successfully",
      description: `${uploadedFiles.length} file(s) uploaded and ready for processing.`,
    });
  };

  const handleDataCleaning = async (fileId: string) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    try {
      // Simulate data cleaning process with progress updates
      for (let i = 0; i <= 100; i += 10) {
        setProcessingProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      setFiles(prev => prev.map(file => 
        file.id === fileId 
          ? { 
              ...file, 
              status: 'cleaned',
              cleanedVersion: `${file.originalName}_cleaned.xlsx`
            }
          : file
      ));
      
      toast({
        title: "Data Cleaning Completed",
        description: "File has been cleaned and standardized successfully.",
      });
    } catch (error) {
      toast({
        title: "Cleaning Failed",
        description: "An error occurred during data cleaning.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const handleReconciliation = async (gstr2aFileId: string, invoiceFileId: string) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    try {
      const gstr2aFile = files.find(f => f.id === gstr2aFileId);
      const invoiceFile = files.find(f => f.id === invoiceFileId);
      
      if (!gstr2aFile || !invoiceFile) {
        throw new Error("Selected files not found");
      }
      
      // Simulate reconciliation process
      for (let i = 0; i <= 100; i += 5) {
        setProcessingProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const result: ReconciliationResult = {
        id: Date.now().toString(),
        timestamp: new Date(),
        gstr2aFile: gstr2aFile.name,
        invoiceFile: invoiceFile.name,
        matchedRecords: Math.floor(Math.random() * 1000) + 500,
        unmatchedRecords: Math.floor(Math.random() * 100) + 10,
        variances: [],
        status: 'completed',
        reportPath: `reconciliation_report_${Date.now()}.xlsx`
      };
      
      setReconciliationResults(prev => [result, ...prev]);
      
      toast({
        title: "Reconciliation Completed",
        description: "Report has been generated and is ready for download.",
      });
      
      // Auto-open the report (simulated)
      setTimeout(() => {
        toast({
          title: "Report Opened",
          description: "Reconciliation report has been opened automatically.",
        });
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Reconciliation Failed",
        description: "An error occurred during reconciliation process.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const deleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    toast({
      title: "File Deleted",
      description: "File has been removed from the system.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            GST Reconciliation Tool
          </h1>
          <p className="text-gray-600 text-lg">
            Advanced reconciliation system for GSTR-2A and Invoice data
          </p>
        </div>

        {isProcessing && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-700">
                    Processing... {processingProgress}%
                  </span>
                  <RefreshCcw className="h-4 w-4 animate-spin text-blue-600" />
                </div>
                <Progress value={processingProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Files
            </TabsTrigger>
            <TabsTrigger value="cleaning" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Data Cleaning
            </TabsTrigger>
            <TabsTrigger value="reconciliation" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Reconciliation
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard files={files} reconciliationResults={reconciliationResults} />
          </TabsContent>

          <TabsContent value="upload">
            <FileUploadSection onFileUpload={handleFileUpload} />
          </TabsContent>

          <TabsContent value="cleaning">
            <DataCleaningPanel 
              files={files} 
              onCleanData={handleDataCleaning}
              onDeleteFile={deleteFile}
              isProcessing={isProcessing}
            />
          </TabsContent>

          <TabsContent value="reconciliation">
            <ReconciliationEngine 
              files={files.filter(f => f.status === 'cleaned')}
              onReconcile={handleReconciliation}
              isProcessing={isProcessing}
            />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsSection reconciliationResults={reconciliationResults} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GSTReconciliation;
