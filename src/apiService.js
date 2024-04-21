export const baseUrl = 'http://10.145.89.178:8000'
export const uploadVideoRoute = `${baseUrl}/api/v1/upload-video`
export const allRecordsRoute = `${baseUrl}/api/v1/parsed-videos`


export const getMediaRoutesById = (id) => {
    const mediaRoutes = {
        inputVideoRoute: `${baseUrl}/media/${id}/input_video.mp4`,
        outputVideoRoute: `${baseUrl}/media/${id}/output_video.mp4`,
    }
    return mediaRoutes
}