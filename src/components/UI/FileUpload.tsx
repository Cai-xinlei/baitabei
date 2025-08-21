import React, { useState } from 'react';
import { Upload, Button, message, Progress, Card } from 'antd';
import { UploadOutlined, DeleteOutlined, FileOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

interface FileUploadProps {
  maxCount?: number;
  maxSize?: number; // MB
  accept?: string;
  onFileChange?: (files: UploadFile[]) => void;
  value?: UploadFile[];
  disabled?: boolean;
  title?: string;
  description?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  maxCount = 5,
  maxSize = 10,
  accept = '.pdf,.doc,.docx,.zip,.rar,.jpg,.jpeg,.png',
  onFileChange,
  value = [],
  disabled = false,
  title = '上传文件',
  description = '支持 PDF、Word、压缩包、图片等格式'
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(value);
  const [uploading, setUploading] = useState(false);

  // 文件上传前检查
  const beforeUpload = (file: File) => {
    // 检查文件大小
    const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isLtMaxSize) {
      message.error(`文件大小不能超过 ${maxSize}MB!`);
      return false;
    }

    // 检查文件类型
    const acceptTypes = accept.split(',').map(type => type.trim());
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    const isValidType = acceptTypes.some(type => {
      if (type.includes('*')) {
        // 处理 image/* 这种格式
        const mimeType = type.split('/')[0];
        return file.type.startsWith(mimeType);
      }
      return type === fileExt;
    });
    
    if (!isValidType) {
      message.error(`不支持的文件格式！支持: ${accept}`);
      return false;
    }

    return true;
  };

  // 模拟上传到阿里云OSS
  const customUpload = async (options: any) => {
    const { file, onProgress, onSuccess, onError } = options;

    try {
      setUploading(true);
      
      // TODO: 这里集成真实的阿里云OSS上传
      // 目前使用模拟上传
      
      // 模拟上传进度
      let progress = 0;
      const timer = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        onProgress({ percent: Math.round(progress) });
        
        if (progress >= 100) {
          clearInterval(timer);
          
          // 模拟上传成功
          const mockUrl = `https://example-bucket.oss-cn-beijing.aliyuncs.com/uploads/${Date.now()}_${file.name}`;
          
          onSuccess({
            name: file.name,
            url: mockUrl,
            status: 'done'
          });
          
          setUploading(false);
        }
      }, 100);
      
    } catch (error) {
      console.error('Upload error:', error);
      onError(error);
      setUploading(false);
      message.error('文件上传失败');
    }
  };

  // 文件列表变化处理
  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    // 限制文件数量
    if (newFileList.length > maxCount) {
      newFileList = newFileList.slice(0, maxCount);
      message.warning(`最多只能上传 ${maxCount} 个文件`);
    }

    // 更新文件状态
    newFileList = newFileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
    onFileChange?.(newFileList);

    // 处理上传状态消息
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };

  // 移除文件
  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
    onFileChange?.(newFileList);
  };

  // 获取文件图标
  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const iconMap: { [key: string]: string } = {
      'pdf': '📄',
      'doc': '📝',
      'docx': '📝',
      'zip': '🗜️',
      'rar': '🗜️',
      'jpg': '🖼️',
      'jpeg': '🖼️',
      'png': '🖼️',
      'gif': '🖼️'
    };
    return iconMap[ext || ''] || '📎';
  };

  const uploadProps: UploadProps = {
    multiple: true,
    fileList,
    beforeUpload,
    customRequest: customUpload,
    onChange: handleChange,
    onRemove: handleRemove,
    disabled: disabled || uploading,
    accept,
    showUploadList: false // 使用自定义文件列表
  };

  return (
    <div className="space-y-4">
      {/* 上传区域 */}
      <Upload.Dragger {...uploadProps} className="!border-dashed !border-2 !border-gray-300 hover:!border-red-400">
        <div className="py-8">
          <UploadOutlined className="text-4xl text-gray-400 mb-4" />
          <div className="text-lg font-medium mb-2">{title}</div>
          <div className="text-gray-500 mb-2">{description}</div>
          <div className="text-sm text-gray-400">
            文件大小不超过 {maxSize}MB，最多上传 {maxCount} 个文件
          </div>
          <Button type="primary" className="mt-4" disabled={disabled || uploading}>
            {uploading ? '上传中...' : '选择文件'}
          </Button>
        </div>
      </Upload.Dragger>

      {/* 文件列表 */}
      {fileList.length > 0 && (
        <div className="space-y-2">
          <div className="font-medium text-gray-700">已选择文件 ({fileList.length}/{maxCount})</div>
          {fileList.map(file => (
            <Card key={file.uid} size="small" className="shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="text-2xl">{getFileIcon(file.name)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {file.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {(file.size! / 1024 / 1024).toFixed(2)} MB
                    </div>
                    {file.status === 'uploading' && (
                      <Progress 
                        percent={file.percent} 
                        size="small" 
                        className="mt-1"
                        strokeColor="#ff4d4f"
                      />
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {file.status === 'done' && (
                    <span className="text-green-500 text-sm">✓ 上传成功</span>
                  )}
                  {file.status === 'error' && (
                    <span className="text-red-500 text-sm">✗ 上传失败</span>
                  )}
                  {file.status === 'uploading' && (
                    <span className="text-blue-500 text-sm">上传中...</span>
                  )}
                  
                  <Button 
                    type="text" 
                    size="small" 
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemove(file)}
                    className="text-red-500 hover:text-red-700"
                    disabled={uploading}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;