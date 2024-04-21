import { retrieveData } from "./storage"

export const uploadVideoRoute = `/api/v1/upload-video`
export const allRecordsRoute = `/api/v1/parsed-videos`

export const getBaseUrl = async () => {
    const ip = await retrieveData('server-ip-address');
    const port = '8000';

    return `http://${ip}:${port}`;
}

export const getMediaRoutesById = async (id) => {
    const baseUrl = await getBaseUrl();
    const mediaRoutes = {
        inputVideoRoute: `${baseUrl}/media/${id}/input_video.mp4`,
        outputVideoRoute: `${baseUrl}/media/${id}/output_video.mp4`,
    }
    return mediaRoutes;
}

