<?php

namespace App\Services;

use Illuminate\Session\Store;
use ImageOptimizer;

class UploadFiles
{
    public static function deleteFile($path)
    {
        $path = public_path() . $path;
        if (\File::exists($path)) {
            \File::delete($path);
        }
        return true;
    }

    public static function storeFileAndRenameWithMicrotime($file, $newFileName, $pathType = '')
    {

        $path = '/uploads/' . $pathType;
        $name = str_replace('.', '', (string)microtime(true)) . '_' . $newFileName . '.' . $file->extension();

        // Create path if it does not exist
        if (!file_exists(public_path() . $path)) {
            mkdir(
                public_path() . $path,
                0777,
                true
            );
        }

        // Move image to corresponding directory
        $file->move(public_path() . $path, $name);
        return $path . '/' . $name;
    }

    public static function uploadFileWithProyectNameAndRename($projectName, $file, $newNameFile, $pathType = '')
    {
        $path = '/uploads/' . $pathType;
        $name = '_' . $projectName . '_' . $newNameFile . '.' . $file->extension();

        // Create path if does not exists
        if (!file_exists(public_path() . $path)) {
            mkdir(
                public_path() . $path,
                0777,
                true
            );
        }

        // Move image to corresponding directory
        $file->move(public_path() . $path, $name);
        ImageOptimizer::optimize(public_path() . $path . '/' . $name);

        return $path . '/' . $name;
    }

    public static function storeFile($file, $pathType = '',$recordId = '')
    {
        $path = '/uploads/' . $pathType;
        $name = str_replace('.', '', (string)microtime(true)) . '_' . $recordId . '_' . $file->getClientOriginalName();

        // Create path if it does not exist
        if (!file_exists(public_path() . $path)) {
            mkdir(
                public_path() . $path,
                0777,
                true
            );
        }

        // Move the file to the corresponding directory
        $file->move(public_path() . $path, $name);
        return $path . '/' . $name;
    }
}
