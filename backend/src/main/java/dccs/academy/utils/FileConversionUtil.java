package dccs.academy.utils;

import java.util.Base64;

public class FileConversionUtil {

    private static final String VALID_BASE_64_START = "data:";
    private static final String BASE_64_DELIMITER = ",";
    private static final String BASE_64_SUFFIX_PDF = "application/pdf;base64,";

    public static byte[] convertBase64ToBlob(String base64String) {
        if (base64String == null || !base64String.startsWith(VALID_BASE_64_START)) {
            throw new IllegalArgumentException("Invalid Base64 string");
        }

        String base64Data = base64String.split(BASE_64_DELIMITER)[1];
        return Base64.getDecoder().decode(base64Data);
    }

    public static String convertToBase64Pdf(byte[] blobData) {
        if (blobData == null) {
            return null;
        }

        String base64String = Base64.getEncoder().encodeToString(blobData);
        return VALID_BASE_64_START + BASE_64_SUFFIX_PDF + base64String;
    }
}