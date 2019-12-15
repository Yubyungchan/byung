# byung

가.	AWS IoT시작하기
아두이노 IDE 창을 엽니다 [스케치] - [라이브러리] - [라이브러리 관리] 메뉴 클릭
검색창에 다음 5가지 라이브러리를 검색하여 설치합니다.
WiFiNINA (or WiFi101 for the MKR1000)
ArduinoBearSSL
ArduinoECCX08
ArduinoMqttClient
Arduino Cloud Provider Examples
1.1	AWS IoT Core에 아두이노 보드를 연결하기 위한 설정
AWS IoT Core는 X.509 인증서를 사용하여 디바이스를 인증함.
X.509 인증서를 생성하기 위해서, 아두이노 보드에서 CSR(Certificate Signing Request)를 생성한후, 이를 AWS 콘솔에서 업로드할 것이다.

	CSR 생성 절차
MKR WiFi 1010 보드를 USB 케이블로 컴퓨터와 연결
Arduino IDE의 [파일]-[예제]-[ArduinoECCX08]-[Tools]-[ECCX08CSR] 메뉴 선텍
시리얼 모니터 창을 연다. (줄 마침 설정은 Both NL & CR로 되어 있어야 함)
시리얼 모니터 창에서 CSR에 포함될 정보를 입력하는데, 아래 그림과 같이 Common Name 을 제외하곤 모두 빈칸을 입력 (아무 입력없이 전송 버튼을 누름)

Common Name: MyMKRWiFi1010 입력
-----BEGIN CERTIFICATE REQUEST----- 과 
-----END CERTIFICATE REQUEST-----
 사이에 생성된 CSR 문자열을 복사하여 메모장에 붙여넣기 한 후, csr.txt 파일로 저장합니다.





1.2	레지스트리에 디바이스 등록
1.먼저 aws가입을 한후 [서비스] -> [IOT Core]에 들어갑니다.
2.지역을 미국 동부(us-east-1)로 한뒤 [관리]->[사물]에 들어갑니다.
3.[사물등록]을 클릭을 합니다.
4.Creating AWS IoT things(AWS IoT 사물 생성) 페이지에서 Create a single thing(단일 사물 생성)을 선택합니다.
5. 사물 생성 페이지의 이름 필드에 MyMKRWiFi1010과 같은 사물의 이름을 입력합니다. 나머지 부분은 그대로 나두고 다음을 선택합니다.
6.사물에 인증서 추가 페이지에서 CSR을 통한 생성을 선택합니다.
7.앞서 생성한 CSR 파일 (csr.txt)을 선택하고, 열기를 클릭한 후, 파일 업로드를 클릭합니다.
다음 화면에서 사물 등록을 클릭합니다.
8.이제 여러분은 사물 페이지에서 새롭게 등록된 사물을 확인할 수 있습니다.

1.3	AWS IoT 정책 생성
	1.X.509 인증서는 AWS IoT에서 디바이스를 인증하는 데 사용합니다.
	2.AWS IoT 정책은 디바이스가 MQTT 주제 구독 또는 게시와 같은 AWS IoT 작업을 수행할 수 있는 권한을 부여하는 데 사용합니다.
	사용자의 디바이스는 AWS IoT(으)로 메시지를 전송할 때 인증서를 제출합니다.
	디바이스가 AWS IoT 작업을 수행하도록 허용하려면 AWS IoT 정책을 생성하여 디바이스 인증서에 연결해야 합니다.
1 .AWS IoT 정책을 생성하기 
-	왼쪽 탐색 창에서 보안을 선택하고 정책을 선택합니다. [You don't have a policy yet] 페이지에서 [Create a policy]를 선택합니다.
-	정책 생성 페이지의 이름 필드에 정책 이름(예: AllowEverything)을 입력합니다.
작업 필드에 iot:*를 입력합니다.
리소스 ARN 필드에 *를 입력합니다.
[Allow] 확인란을 선택합니다.
이렇게 하면 모든 클라이언트가 AWS IoT에 연결할 수 있습니다.



1.4	디바이스 인증서에 AWS IoT 정책 연결

	정책을 생성했으면 디바이스 인증서에 이 정책을 연결해야 합니다. 인증서에 AWS IoT 정책을 연결하는 것은 정책에 지정된 권한을 디바이스에 부여하는 것입니다.

-	왼쪽 탐색 창에서 보안을 선택하고 인증서를 선택합니다. (인증서가 안보이면 브라우저의 새로고침을 눌러보세요)
-	앞서 생성한 인증서의 상자에서 ...를 선택해 드롭다운 메뉴를 연 다음 [정책 연결]를 선택합니다.
-	인증서에 정책 연결 대화 상자에서 앞 단계에서 생성한 정책(AllowEverything) 옆의 확인란을 선택한 다음 연결을 선택합니다.

1.5 디바이스 구성 
모든 디바이스에는 AWS IoT와 통신할 수 있도록 디바이스 인증서가 설치되어 있어야 합니다.
1.	왼쪽 탐색 창에서 보안을 선택하고 인증서를 선택합니다.
2.	앞서 생성한 인증서의 상자에서 ...를 선택해 드롭다운 메뉴를 연 다음 [다운로드]를 선택합니다.
3.	다운로드된 인증서(xxxxxxxxxx-certificate.perm.crt)를 확인합니다.
4.	왼쪽 탐색 창에서 설정을 선택하고, 엔드포인트를 기억해 둡니다.
5.	Arduino IDE의 파일-예제-Arduino Cloud Provider Examples-AWSIoT-AWS_IoT_WiFi 메뉴 선텍
•	arduino_secrets.h 탭에서, 사용가능한 WiFi의 SSID와 Password를 설정
•	// Fill in  your WiFi networks SSID and password
•	#define SECRET_SSID ""
#define SECRET_PASS ""
•	앞에서 확인한 엔드포인트를 SECRET_BROKER 값으로 설정
•	// Fill in the hostname of your AWS IoT broker
#define SECRET_BROKER "xxxxxxxxxxxxxx.iot.xx-xxxx-x.amazonaws.com"
•	앞에서 다운로드한 인증서 파일을 텍스트 에디터로 열고 값을 복사하여 다음 영역에 붙여넣기 한다.
•	// Fill in the boards public certificate
•	const char SECRET_CERTIFICATE[] = R"(
•	-----BEGIN CERTIFICATE-----
•	-----END CERTIFICATE-----
)";

1.5 테스트
1.	스케치 프로그램을 보드에 업로드하고, 시리얼 모니터 창을 연다.
o	보드는 WiFi 네트워크와 연결을 시도하고, 성공하면 AWS IoT에 MQTT를 통해 연결을 시도한다.

같은 방법으로 서울(ap-northeast-2)에서 MotorMKR 디바이스를 만들어줍니다.
아두이노 코드에서도 Common name을 MotorMKR로 이름지어줍니다.
앞으로 만들 2가지의 사물인터넷 디바이스는 코드에서 꼭 지역과 디바이스명을 확실히 기억하고 업로드를 해주어야 합니다.


나.	AWS Lambda를 이용한 서버리스 컴퓨팅 시작하기
A.	실시간 파일 처리
i.	Amazon S3를 사용하여 업로드하는 즉시 데이터를 처리하도록 AWS Lambda를 트리거할 수 있습니다. 예를 들어, Lambda를 사용하여 실시간으로 이미지를 썸네일하고, 동영상을 트랜스코딩하고, 파일을 인덱싱하고, 로그를 처리하고, 콘텐츠를 검증하고, 데이터를 수집 및 필터링할 수 있습니다.

 ![a](https://user-images.githubusercontent.com/58905309/70861910-ffb76600-1f77-11ea-98ec-68406628e987.jpg)
 
B.	IoT 백엔드
i.	IoT 디바이스에서 생성된 텔레메트리 정보를 DynamoDB 테이블에 채우기 위해서 AWS Lambda를 이용하고, Lambda 함수를 사용하여 데이터베이스에서 특정 장치 일련 번호와 임의로 생성 된 활성화 코드를 검색하여 장치를 활성화하고 장치 소유자의 전자 메일을 동일한 테이블에 등록합니다.
 
![b](https://user-images.githubusercontent.com/58905309/70861909-fa5a1b80-1f77-11ea-8731-58e0595156f0.jpg)

1.먼저 콘솔로 Lambda 함수를 만들어줍니다.
콘솔로 Lambda 함수 만들기
2.Eclipse 용 AWS Toolkit을 설정해주어야 합니다
Eclipse 용 AWS Toolkit 설정
•	[주의] Eclipse 용 AWS Toolkit은 Java 1.8에서 정상적으로 동작하고, JDK 9 이상에서 실행 시킨 경우에 javax/xml/bind/JAXBException 발생한다. 따라서, Eclipse가 Java 1.8에서 동작하도록 설정을 변경해야 함.
o	eclipse.ini파일을 찾아서, -vm 옵션 다음에 지정하는 JVM 패스를 JDK1.8로 변경함.

3.Eclipse에 AWS 자격 증명을 설정해주어야 합니다.
AWS 자격 증명 설정
4. 연습용으로 AWS Lambda 함수를 생성,업로드,호출해보는 연습을 해봅니다.
 자습서: AWS Lambda 함수 생성, 업로드, 호출 방법
우클릭 – AWS Upload할 때 [Select Target Lambda Function] 페이지에서 지역을 꼭 계정에 만들어둔 아두이노의 지역과 맞춰주어야 합니다. 저희는 버지니아로 합니다.








다.	DynamoDB를 이용한 백엔드 구축하기
1단계: 역할 설정
AWS 에서 [서비스] – [IAM]을 접속합니다. 왼쪽 카테고리 창에 [역할] 클릭합니다.
[역할 만들기]를 클릭합니다.
[신뢰할 수 있는 유형의 개체 선택]에 [AWS 서비스]를 선택하고
[이 역할을 사용할 서비스 선택]에서 [lambda]를 선탣합니다. 그리고 [다음: 권한]을 클릭합니다.
정책 필터 검색창에 AmazonDynamoDBFullAccess를 검색하고 네모박스를 클릭 선택후 [다음: 태그]합니다.
키-값은 무시하고 [다음: 검토]를 클릭합니다.
역할 이름에 [dynamodb]를 입력 – [역할 만들기]를 클릭하여 역할 만들기를 완성합니다.

2단계: DynamoDB 테이블 만들기
다음 단계에 따라 Waterlevel 테이블을 생성합니다.
1.	AWS Management 콘솔에 로그인하고 https://console.aws.amazon.com/dynamodb/에서 DynamoDB 콘솔을 엽니다.
2.	콘솔 왼쪽의 탐색 창에서 [대시보드]를 선택합니다.
3.	콘솔의 오른쪽에서 [테이블 만들기]을 선택합니다.
4.	다음과 같이 테이블 세부 정보를 입력합니다.
o	테이블 이름에 Waterlevel을 입력합니다.
o	파티션 키에 deviceId를 입력합니다. 데이터유형은 문자열을 선택합니다.
o	정렬 키 추가 체크박스를 선택합니다.
o	정렬 키에 time을 입력합니다. 데이터유형은 번호를 선택합니다.
5.	[생성]을 선택하여 테이블을 생성합니다.

3단계: Lambda 함수 정의
1.	AWS Lambda 프로젝트를 Eclipse용 AWS Toolkit을 이용하여 생성한다.
o	Project name: Waterlevel
o	Group ID: com.example.lambda
o	Artifact ID: recording
o	Class Name: RecordingDeviceInfoHandler2
o	Input Type에서 Custom을 선택합니다.
2.	Finish 버튼을 클릭합니다.
3.	Eclipse 프로젝트 탐색기를 사용하여 RecordingDeviceDataLambdaJavaProject2 프로젝트에서 RecordingDeviceInfoHandler2.java를 열고, 다음 코드로 바꿉니다.


package com.example.lambda.recording;

import java.text.SimpleDateFormat;
import java.util.TimeZone;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.spec.PutItemSpec;
import com.amazonaws.services.dynamodbv2.model.ConditionalCheckFailedException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class RecordingDeviceInfoHandler2 implements RequestHandler<Document, String> {

	 private DynamoDB dynamoDb;
	    private String DYNAMODB_TABLE_NAME = "waterleveldb2";

	    @Override
	    public String handleRequest(Document input, Context context) {
	        this.initDynamoDbClient();
	        context.getLogger().log("Input: " + input);

	        //return null;
	        return persistData(input);
	    }

	    private String persistData(Document document) throws ConditionalCheckFailedException {

	        // Epoch Conversion Code: https://www.epochconverter.com/
	        SimpleDateFormat sdf = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
	        sdf.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
	        String timeString = sdf.format(new java.util.Date (document.timestamp*1000));

	        // temperature와 LED 값이 이전상태와 동일한 경우 테이블에 저장하지 않고 종료 
	        if (document.current.state.reported.WaterLevel.equals(document.previous.state.reported.WaterLevel) && 
	                document.current.state.reported.LED.equals(document.previous.state.reported.LED) && 
	                document.current.state.reported.LED2.equals(document.previous.state.reported.LED2) && 
	                document.current.state.reported.LED3.equals(document.previous.state.reported.LED3)) {
	                return null;
	        }

	        return this.dynamoDb.getTable(DYNAMODB_TABLE_NAME)
	                .putItem(new PutItemSpec().withItem(new Item().withPrimaryKey("deviceId", document.device)
	                        .withLong("time", document.timestamp)
	                        .withString("WaterLevel", document.current.state.reported.WaterLevel)
	                        .withString("ledRed", document.current.state.reported.LED)
	                        .withString("ledYellow", document.current.state.reported.LED2)
	                        .withString("ledGreen", document.current.state.reported.LED3)
	                        .withString("timestamp",timeString)))
	                .toString();
	    }

	    private void initDynamoDbClient() {
	        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().withRegion("us-east-1").build();

	        this.dynamoDb = new DynamoDB(client);
	    }

	}

	/**
	 * AWS IoT은(는) 섀도우 업데이트가 성공적으로 완료될 때마다 /update/documents 주제에 다음 상태문서를 게시합니다
	 * JSON 형식의 상태문서는 2개의 기본 노드를 포함합니다. previous 및 current. 
	 * previous 노드에는 업데이트가 수행되기 전의 전체 섀도우 문서의 내용이 포함되고, 
	 * current에는 업데이트가 성공적으로 적용된 후의 전체 섀도우 문서가 포함됩니다. 
	 * 섀도우가 처음 업데이트(생성)되면 previous 노드에는 null이 포함됩니다.
	 * 
	 * timestamp는 상태문서가 생성된 시간 정보이고, 
	 * device는 상태문서에 포함된 값은 아니고, Iot규칙을 통해서 Lambda함수로 전달된 값이다. 
	 * 이 값을 해당 규칙과 관련된 사물이름을 나타낸다. 
	 */
	class Document {
	    public Thing previous;       
	    public Thing current;
	    public long timestamp;
	    public String device;       // AWS IoT에 등록된 사물 이름 
	}

	class Thing {
	    public State state = new State();
	    public long timestamp;
	    public String clientToken;

	    public class State {
	        public Tag reported = new Tag();
	        public Tag desired = new Tag();

	        public class Tag {
	            public String WaterLevel;
	            public String LED;
	            public String LED2;
	            public String LED3;
	        }
	    }
	}

4.	Lambda에 함수를 업로드하려면, Eclipse 코드 창에서 마우스 오른쪽 버튼을 클릭하고 [AWS Lambda]와 [Upload function to AWS Lambda]를 차례대로 선택합니다.
5.	[Select Target Lambda Function] 페이지에서 사용할 AWS 리전을 선택합니다. 이 리전은 Amazon S3 버킷에 대해 선택한 리전과 동일해야 합니다.
6.	새 Lambda 함수 생성을 선택하고 함수 이름(예: WaterlevelDeviceInfoFunction)을 입력합니다.
7.	[Next]를 선택합니다.
8.	함수 구성 페이지에서 대상 Lambda 함수에 대한 설명을 입력하고 함수에서 사용할 IAM 역할 선택합니다.
o	선택할 IAM 역할에는 dynamoDB에 대한 접근 권한이 설정되어 있어야 합니다.(dynamodb)
9.	Lambda 함수에 대해 새로운 Amazon S3 버킷을 생성하고 싶은 경우에는 함수 구성 페이지로 이동하여 함수 코드에 대한 S3 버킷 섹션에서 생성을 선택합니다. 버킷 생성 대화 상자에 버킷 이름을 입력합니다.
10.	Finish를 선택하여 Lambda 함수를 AWS에 업로드합니다.







4단계: IoT 규칙 설정
1.	AWS IoT 콘솔로 이동하여 탐색 창에서 Act (액트)을 선택합니다.
2.	새로운 규칙을 생성하기 위해 생성을 클릭합니다.
3.	이름에 waterleveldbact을 입력합니다.
4.	규칙 쿼리 설명문에 다음을 입력합니다.
SELECT *, 'MyMKRWiFi1010' as device FROM '$aws/things/MyMKRWiFi1010/shadow/update/documents'
o	'$aws/things/MyMKRWiFi1010/shadow/update/documents' 주제로 전송된 메시지가 규칙을 트리거하고, 이 때 전달된 메시지의 모든 항목과 함께 항목 값이 MyMKRWiFi1010인 device 항목을 규칙에 설정된 작업의 입력값으로 전달한다.
o	[가정]: 위 규칙 쿼리는 사물이름이 MyMKRWiFi1010인 경우이고, 사물이름이 다른경우에는 이을 본인이 만든 사물이름으로 변경해야 합니다.
5.	작업 추가를 선택합니다.
6.	작업 선택 아래에서 Send a message to a Lambda function(메시지를 Lambda 함수로 전송)을 선택한 다음 작업 구성을 선택합니다.
7.	선택을 클릭하고, Lambda 함수(WaterlevelDeviceInfoFunction)를 선택합니다.
8.	작업 추가를 선택합니다.

5단계: 깃허브에 올린 Waterlevel 아두이노코드를 업로드후 DynamoDB에 데이터가 쌓이는지 확인해 봅니다.














라.	 디바이스 로그 조회 REST API 구축하기
 디바이스 로그 조회 REST API 구축하기
•	API 요청
GET /devices/{deviceId}/log?from=1000&to=2000
•	응답모델
•	{
•	    "data":[
•	        {
•	            "time":timestamp,
•	            "attributes": {
•	                "attribute1": integer3,
•	                "attribute2": "string3",
•	                ...
•	            }
•	        },
•	        ...
•	    ]
}
1단계: AWS Toolkit을 통해 Lambda 함수 생성
1.	다음 정보를 바탕으로 AWS Lambda 프로젝트를 Eclipse용 AWS Toolkit을 이용하여 생성한다.
o	Project name: LogDeviceLambdaJavaProject
o	Class Name: LogDeviceHandler
o	Input Type에서 Custom을 선택합니다.
2.	Eclipse 프로젝트 탐색기를 사용하여 LogDeviceLambdaJavaProject 프로젝트에서 LogDeviceHandler.java를 열고, 다음 코드로 바꿉니다.
3.	import java.text.ParseException;
4.	import java.text.SimpleDateFormat;
5.	import java.util.Iterator;
6.	import java.util.TimeZone;
7.	
8.	import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
9.	import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
10.	import com.amazonaws.services.dynamodbv2.document.DynamoDB;
11.	import com.amazonaws.services.dynamodbv2.document.Item;
12.	import com.amazonaws.services.dynamodbv2.document.ItemCollection;
13.	import com.amazonaws.services.dynamodbv2.document.QueryOutcome;
14.	import com.amazonaws.services.dynamodbv2.document.Table;
15.	import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
16.	import com.amazonaws.services.dynamodbv2.document.utils.NameMap;
17.	import com.amazonaws.services.dynamodbv2.document.utils.ValueMap;
18.	import com.amazonaws.services.lambda.runtime.Context;
19.	import com.amazonaws.services.lambda.runtime.RequestHandler;
20.	
21.	public class LogDeviceHandler implements RequestHandler<Event, String> {
22.	
23.	    private DynamoDB dynamoDb;
24.	    private String DYNAMODB_TABLE_NAME = "Waterleve";
25.	
26.	    @Override
27.	    public String handleRequest(Event input, Context context) {
28.	        this.initDynamoDbClient();
29.	
30.	        Table table = dynamoDb.getTable(DYNAMODB_TABLE_NAME);
31.	
32.	        long from=0;
33.	        long to=0;
34.	        try {
35.	            SimpleDateFormat sdf = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
36.	            sdf.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
37.	
38.	            from = sdf.parse(input.from).getTime() / 1000;
39.	            to = sdf.parse(input.to).getTime() / 1000;
40.	        } catch (ParseException e1) {
41.	            e1.printStackTrace();
42.	        }
43.	
44.	        QuerySpec querySpec = new QuerySpec()
45.	                .withKeyConditionExpression("deviceId = :v_id and #t between :from and :to")
46.	                .withNameMap(new NameMap().with("#t", "time"))
47.	                .withValueMap(new ValueMap().withString(":v_id",input.device).withNumber(":from", from).withNumber(":to", to)); 
48.	
49.	        ItemCollection<QueryOutcome> items=null;
50.	        try {           
51.	            items = table.query(querySpec);
52.	        }
53.	        catch (Exception e) {
54.	            System.err.println("Unable to scan the table:");
55.	            System.err.println(e.getMessage());
56.	        }
57.	
58.	        return getResponse(items);
59.	    }
60.	
61.	    private String getResponse(ItemCollection<QueryOutcome> items) {
62.	
63.	        Iterator<Item> iter = items.iterator();
64.	        String response = "{ \"data\": [";
65.	        for (int i =0; iter.hasNext(); i++) {
66.	            if (i!=0) 
67.	                response +=",";
68.	            response += iter.next().toJSON();
69.	        }
70.	        response += "]}";
71.	        return response;
72.	    }
73.	
74.	    private void initDynamoDbClient() {
75.	        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();
76.	
77.	        this.dynamoDb = new DynamoDB(client);
78.	    }
79.	}
80.	
81.	class Event {
82.	    public String device;
83.	    public String from;
84.	    public String to;
}
85.	Lambda에 함수를 업로드하려면, Eclipse 코드 창에서 마우스 오른쪽 버튼을 클릭하고 [AWS Lambda]와 [Upload function to AWS Lambda]를 차례대로 선택합니다.
86.	[Select Target Lambda Function] 페이지에서 사용할 AWS 리전을 선택합니다. 이 리전은 Amazon S3 버킷에 대해 선택한 리전과 동일해야 합니다.
87.	새 Lambda 함수 생성을 선택하고 함수 이름(예: WaterDeviceFunction)을 입력한 후, [Next]를 선택합니다.
88.	함수 구성Function Configuration 페이지에서 대상 Lambda 함수에 대한 설명을 입력하고 함수에서 사용할 IAM 역할 선택합니다.
o	사용할 역할은 AmazonDynamoDBFullAccess 정책이 연결되어 있어야 합니다. 만약 이러한 역할이 없다면, IAM 콘솔을 통해 해당 역할을 생성합니다.
	다음 링크를 통해 역할 생성에 대해서 자세히 살펴보세요.
89.	Lambda 함수 코드를 저장할 S3 버킷을 선택합니다. 만약 새로운 Amazon S3 버킷을 생성하고 싶은 경우에는 생성 버튼을 클릭하고 버킷 생성 대화 상자에 버킷 이름을 입력합니다.
90.	Finish를 선택하여 Lambda 함수를 AWS에 업로드합니다.
91.	Lambda 함수를 실행하려면, Eclipse 코드 창에서 마우스 오른쪽 버튼을 클릭하고 AWS Lambda를 선택한 후 Run Function on AWS Lambda(AWS Lambda에서 함수 실행)를 선택합니다.
92.	Enter the JSON input for your function이 선택된 상태에서 입력 창에 다음 입력 문자열을 입력한다.
o	device 속성: 조회할 사물의 이름이 MyMKRWiFi1010인 경우를 가정
o	from 속성: 시작 시간 (yyyy-MM-dd hh:mm:ss) 형식의 문자열
o	to 속성: 종료 시간 (yyyy-MM-dd hh:mm:ss) 형식의 문자열
{ "device": "MyMKRWiFi1010", "from":"2019-12-10 17:56:26", "to": "2019-12-30 18:56:26"} 
93.	Invoke 버튼을 클릭한 후, Eclipse Console 창에 다음과 같은 결과가 출력되는 지 확인합니다.

2단계: API Gateway 콘솔에서 REST API 생성

1.	API Gateway 콘솔로 이동합니다.
2.	이전에 생성한 my-device-api를 선택합니다.
3.	리소스 이름(/{device})을 선택합니다.
4.	작업 드롭다운 메뉴에서 리소스 생성을 선택합니다.
5.	리소스 이름에 log를 입력하고, 리소스 생성을 클릭합니다.
6.	작업 드롭다운 메뉴에서 메소드 생성을 선택합니다.
7.	리소스 이름 (/log) 아래에 드롭다운 메뉴가 보일 것입니다. GET을 선택한 후 확인 표시 아이콘(체크)을 선택하여 선택 사항을 저장합니다.
8.	/devices/{device}/log – GET – 설정 창의 통합 유형에서 Lambda 함수를 선택합니다.
9.	Lambda 프록시 통합 사용 상자를 선택하지 않은 상태로 놔둡니다.
10.	Lambda 리전에서 Lambda 함수를 생성한 리전을 선택합니다.
11.	Lambda 함수 필드에 문자를 입력한 후 드롭다운 메뉴에서 WaterDeviceFunction 을 선택합니다. 저장을 선택하여 선택 사항을 저장합니다
12.	Lambda 함수에 대한 권한 추가 팝업이 나타나면(Lambda 함수를 호출하기 위해 API Gateway에 권한을 부여하려고 합니다....”), 확인을 선택하여 API Gateway에 해당 권한을 부여합니다.
o	이제 /devices/{device}/log – GET – 메소드 실행 창이 보일 것입니다.
다음 단계는 API Gateway를 통해 들어오는 클라이언트의 입력을 Lambda 함수에 전달하기 위해서 클라이언트의 입력을 Lambda 함수의 입력으로 매핑하는 과정에 대해서 진행합니다.
1.	메서드 실행 창에서 메서드 요청을 선택합니다.
2.	URL 쿼리 문자열 파라미터(URL Query String Parameters) 섹션을 확장합니다.
o	쿼리 문자열 추가(Add query string)를 선택합니다. 이름에 from을 입력합니다. 필수 옵션을 선택하고 확인 표시 아이콘을 선택하여 설정을 저장합니다. 캐싱(Caching)을 비워두어 이 연습에 불필요한 요금 부과를 방지합니다.
o	쿼리 문자열 추가(Add query string)를 선택합니다. 이름에 to을 입력하고, 이전과 동일한 과정을 진행합니다.
3.	/log GET 메서드를 선택하고 통합 요청(Integration Request)을 선택하여 본문 매핑 템플릿을 설정합니다.
1.	매핑 템플릿(Mapping Templates) 섹션을 확장합니다. 매핑 템플릿 추가(Add mapping template)를 선택합니다. Content-Type에 application/json을 입력합니다. 확인 표시 아이콘을 선택하여 설정을 저장합니다.
	나타나는 팝업에서 예, 이 통합 보호(Yes, secure this integration)를 선택합니다.
2.	요청 본문 패스스루(Request body passthrough)에 권장되는 정의된 템플릿이 없는 경우(권장)를 선택합니다.
3.	매핑 템플릿 편집기에 다음 매핑 스크립트를 입력합니다.
4.	{
5.	  "device": "$input.params('device')",
6.	  "from": "$input.params('from')",
7.	  "to":  "$input.params('to')"
}
8.	저장을 선택합니다.
4.	/devices/{device}/log – GET – 메소드 실행 창으로 이동하여, 클라이언트 부분의 테스트를 클릭합니다.
5.	1단계에서 Lambda 함수를 만든 방법에 따라 다음과 같이 수행합니다.
o	방법1을 사용한 경우: {device} 경로에 본인이 만든 사물의 로그 데이터를 기록하는 DynamoDB 테이블 이름(예, DeviceData)을 입력합니다.
o	방법2를 사용한 경우: {device} 경로에 본인이 만든 사물 이름(예, MyMKRWiFi1010)을 입력합니다.
6.	쿼리 문자열에 아래와 같은 내용을 입력합니다.
from="2019-12-10 00:00:00"&to="2019-12-30 18:09:36"
7.	테스트버튼을 클릭하여 다음과 같은 결과가 나오는 지 확인합니다.
주소창에 넣을때는 from=2019-12-10 00:00:00&to=2019-12-30 18:09:36
위와 같이 “따옴표를 지워줘야합니다.
 
![c](https://user-images.githubusercontent.com/58905309/70861908-f0381d00-1f77-11ea-805d-27d668720177.jpg)

위와 같이 MotorMKR 디바이스를 서울지역으로 만들어줍니다.



