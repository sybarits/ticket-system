package com.qcloud.bot.credential;


import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.ValueRange;
import com.qcloud.bot.model.SheetDto;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

public class GoogleSheetAPI {

    private static final String APPLICATION_NAME =
            "qcloud-bot";

    private static final java.io.File DATA_STORE_DIR = new java.io.File(
            System.getProperty("user.home"), ".credentials/sheets.googleapis.com-java-quickstart");

    private static FileDataStoreFactory DATA_STORE_FACTORY;
    private static final JsonFactory JSON_FACTORY =
        GsonFactory.getDefaultInstance();
    private static HttpTransport HTTP_TRANSPORT;

    private static final List<String> SCOPES =
            Arrays.asList(SheetsScopes.SPREADSHEETS);

    static {
        try {
            HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            DATA_STORE_FACTORY = new FileDataStoreFactory(DATA_STORE_DIR);
        } catch (Throwable t) {
            t.printStackTrace();
            System.exit(1);
        }
    }

    /**
     * OAUTH 2.0 연동시 사용될 callback용 local receiver 포트 지정
     */
    private static final int LOCAL_SERVER_RECEIVER_PORT = 8888;

    private enum AuthMode {
        OAUTH20, SERVICE_ACCOUNT
    }

    public GoogleSheetAPI() {}

    public GoogleSheetAPI(AuthType type) {
        
    }

    

    /**
     * OAUTH 2.0용 credential 생성
     *
     * @return Credential object.
     * @throws IOException
     */
    public Credential getOauth2Authorize() throws IOException {
        // OAUTH 2.0용 secret josn 로드
        InputStream in =
                GoogleSheetAPI.class.getResourceAsStream("/client_secret_551125069216-80feleesdgt94khr4n2j0apqtqu633nq.apps.googleusercontent.com.json");
        GoogleClientSecrets clientSecrets =
                GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        GoogleAuthorizationCodeFlow flow =
                new GoogleAuthorizationCodeFlow.Builder(
                        HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                        .setDataStoreFactory(DATA_STORE_FACTORY)
                        .setAccessType("offline")
                        .build();

        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(LOCAL_SERVER_RECEIVER_PORT).build();

        Credential credential = new AuthorizationCodeInstalledApp(
                flow, receiver).authorize("user");
        // System.out.println(
        //         "Credentials saved to " + DATA_STORE_DIR.getAbsolutePath());
        return credential;
    }

    /**
     * Service Account용 credentail 생성
     * @return Credential object.
     * @throws IOException
     */
    public Credential getServiceAccountAuthorize() throws IOException {

        InputStream in =
                GoogleSheetAPI.class.getResourceAsStream("/qcloud-auto-9509fc734cdb.json");
        Credential credential = GoogleCredential.fromStream(in)
                .createScoped(SCOPES);
        return credential;
    }

    /**
     * Google Credential 정보를 가지고 Google Sheet서비스를 초기화 한다.
     *
     * @return 인증이 통과된 Sheets API client service
     * @throws IOException
     */
    public Sheets getSheetsService(AuthMode authMode) throws IOException {
        Credential credential = null;
        if (authMode == AuthMode.OAUTH20) {
            credential = getOauth2Authorize();
        } else if (authMode == AuthMode.SERVICE_ACCOUNT) {
            credential = getServiceAccountAuthorize();
        }
        return new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    public ValueRange getSheetsRange(SheetDto sheet) throws IOException {
        Credential credential = null;
        credential = getOauth2Authorize();
        Sheets service = new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
        String spreadsheetId = sheet.getSheetID();
        String range = sheet.getRange();
        ValueRange response = service.spreadsheets().values()
                .get(spreadsheetId, range)
                .execute();
        return response;
    }


    public static void main(String[] args) throws IOException {
        GoogleSheetAPI asAPI = new GoogleSheetAPI();
        // 기호에 따라 OAUTH2.0용 인증이나 서비스 계정으로 인증을 수행 후 Sheet Service 객체를 불러온다.
        Sheets service = asAPI.getSheetsService(AuthMode.OAUTH20);
        // Sheets service = getSheetsService(AuthMode.SERVICE_ACCOUNT);

        // 아래의 샘플 구글 시트 URL에서 중간의 문자열이 spreed sheet id에 해당한다.
        // https://docs.google.com/spreadsheets/d/1UzO53WGp8WYS5TAwU32sL3cWFsmVB8VtadY389F4ANE/edit?usp=sharing
        String spreadsheetId = "1UzO53WGp8WYS5TAwU32sL3cWFsmVB8VtadY389F4ANE";
        String range = "A113:B114";
        ValueRange response = service.spreadsheets().values()
                .get(spreadsheetId, range)
                .execute();
        List<List<Object>> values = response.getValues();
        if (values == null || values.size() == 0) {
            System.out.println("No data found.");
        } else {
            for (List row : values) {
                if (row.size() > 0) {
                    System.out.println(row.get(0).toString());
                    System.out.println(row.get(1).toString());
                }
            }
        }
    }

}
