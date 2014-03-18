// Modification mediaelementJS - add 'audio/mp4'
if(typeof mejs !== 'undefined') {
    mejs.plugins = {
        silverlight: [
            {version: [3,0], types: ['audio/mp4','video/mp4','video/m4v','video/mov','video/wmv','audio/wma','audio/m4a','audio/mp3','audio/wav','audio/mpeg']}
        ],
        flash: [
            {version: [9,0,124], types: ['audio/mp4','video/mp4','video/m4v','video/mov','video/flv','video/rtmp','video/x-flv','audio/flv','audio/x-flv','audio/mp3','audio/m4a','audio/mp4','audio/mpeg', 'video/youtube', 'video/x-youtube']}
        ],
        youtube: [
            {version: null, types: ['video/youtube', 'video/x-youtube', 'audio/youtube', 'audio/x-youtube']}
        ],
        vimeo: [
            {version: null, types: ['video/vimeo', 'video/x-vimeo']}
        ]
    };
}
