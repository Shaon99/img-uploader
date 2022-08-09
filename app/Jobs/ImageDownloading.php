<?php

namespace App\Jobs;

use App\Models\ImageUpload;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Exception;
use Illuminate\Notifications\Messages\BroadcastMessage;

class ImageDownloading implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $details;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }


    /**
     * Get the broadcastable representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return BroadcastMessage
     */
    public function toBroadcast($notifiable)
    {
        dd('ok');
        return new BroadcastMessage([
            'message' => $notifiable
        ]);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            $data = ImageUpload::find($this->details);
            $url = $data->image;
            $img = 'image-no-' . $this->details . '.png';  //File name will be download
            $path = base_path() . '/public/download/' . $img;
            //it should store  public download folder
            file_put_contents($path, file_get_contents($url));
            $this->toBroadcast('Image download successfully');
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
