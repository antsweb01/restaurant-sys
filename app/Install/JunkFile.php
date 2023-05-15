<?php

namespace App\Install;

use Illuminate\Support\Facades\File;

class JunkFile
{
    public function getFiles()
    {
        $trueFiles = ['0.67ea79e3.chunk.js', '1.0e91a3a5.chunk.js', '10.9a693340.chunk.js', '11.9d8fce73.chunk.js', '12.e9befe2a.chunk.js', '13.e2f64f6a.chunk.js', '14.bfe1bafb.chunk.js', '15.890e4492.chunk.js', '16.42938481.chunk.js', '17.9c84c2c5.chunk.js', '18.95873fc0.chunk.js', '19.ad1a134f.chunk.js', '2.f8fdecb5.chunk.js', '20.592e144d.chunk.js', '21.60185ee7.chunk.js', '22.42335c40.chunk.js', '23.339178c6.chunk.js', '24.12f625e5.chunk.js', '25.930787d1.chunk.js', '26.f49047ab.chunk.js', '27.344e3dcf.chunk.js', '28.12e5edfc.chunk.js', '29.8e539131.chunk.js', '3.35dc2256.chunk.js', '30.09cb6a74.chunk.js', '31.693f165d.chunk.js', '32.db2465b8.chunk.js', '33.00cf3d9c.chunk.js', '34.9b73d37c.chunk.js', '35.9ccc83ce.chunk.js', '36.ed6a1c7a.chunk.js', '37.d6bc683c.chunk.js', '38.8c1cdd7b.chunk.js', '39.4e385ba9.chunk.js', '4.18274ff6.chunk.js', '5.ad38f985.chunk.js', '6.b0b97e1b.chunk.js', '7.d21e06f3.chunk.js', '8.b1e52a49.chunk.js', 'main.6cf292c4.chunk.js', 'runtime~main.9e8129a6.js'];
        return $trueFiles;
    }

    public function delete()
    {
        $trueFiles = self::getFiles();

        $filesToDelete = [];

        if (is_dir(base_path('static/js'))) {

            $allFrontendFiles = File::files(base_path('static/js/'));
            foreach ($allFrontendFiles as $frontFile) {
                $file = pathinfo($frontFile);
                if (!in_array($file['basename'], $trueFiles)) {
                    array_push($filesToDelete, $file['basename']);
                }
            }

            if (!empty($filesToDelete)) {
                foreach ($filesToDelete as $file) {
                    $filename = base_path('static/js/' . $file);
                    unlink($filename);
                }
            }
        }
    }
}
