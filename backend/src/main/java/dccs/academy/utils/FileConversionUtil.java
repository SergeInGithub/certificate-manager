package dccs.academy.utils;

import java.util.Base64;

public class FileConversionUtil {

    public static byte[] convertBase64ToBlob(String base64String) {
        if (base64String == null || !base64String.startsWith("data:")) {
            throw new IllegalArgumentException("Invalid Base64 string");
        }

        String base64Data = base64String.split(",")[1];
        return Base64.getDecoder().decode(base64Data);
    }

    public static String convertBlobToBase64(byte[] blobData, String mimeType) {
        if (blobData == null) {
            return null;
        }

        String base64String = Base64.getEncoder().encodeToString(blobData);
        return "data:" + mimeType + ";base64," + base64String;
    }
}