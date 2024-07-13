## Giới thiệu

LLM Dictionary là một plugin trên Obsidian hỗ trợ tra cứu từ vựng. Một trong những tính năng thú vị nhất của LLM Dictionary so với các từ điển thông thường là khả năng tra cứu từ vựng theo ngữ cảnh bằng AI. Thay vì chỉ đưa ra các định nghĩa cho sẵn trong từ điển, LLM Dictionary có thể đưa ra các định nghĩa dựa trên ngữ cảnh, giúp người dùng hiểu được nghĩa của từ một cách chính xác và sát với thực tế.

Ngoài ra LLM Dictionary hỗ trợ nhiều ngôn ngữ (bao gồm Anh, Trung, Nhật, Hàn, và có thể bổ sung trong tương lai) và tra cứu từ vựng trên file PDF. Với tính năng này, bạn có thể đọc và tra cứu từ vựng ngay trong PDF, giúp bạn tiết kiệm thời gian và công sức.

LLM Dictionary còn có thể được sử dụng chung với plugin Obsidian to Anki để tạo flashcards. Tức là sau khi tra cứu được từ vựng, bạn có thể tạo flashcards ngay lập tức để ghi nhớ lâu dài. Điều này sẽ giúp bạn học ngoại ngữ một cách hiệu quả hơn.

## Cách thức cài đặt

[Video hướng dẫn](https://youtu.be/BYW3WAPD9Eg)

**Bước 1: Cài đặt plugin BRAT trên Obsidian**

Trước tiên, bạn cần cài đặt plugin BRAT trên Obsidian. BRAT là một plugin trên Obsidian cho phép bạn cài đặt các plugin khác từ GitHub.

**Bước 2: Cài đặt plugin LLM Dictionary trên GitHub**

Sau khi cài đặt BRAT, bạn có thể tải plugin LLM Dictionary thông qua đường dẫn này.

**Bước 3: Tạo tài khoản trên Groq và lấy mã API**

Tiếp theo, bạn cần tạo tài khoản trên Groq và lấy một mã API. Mã API này sẽ được sử dụng để kết nối LLM Dictionary với Groq.

**Bước 4: Dán mã API vào LLM Dictionary**

Sau khi lấy được mã API, bạn hãy dán mã API đó vào LLM Dictionary.

**Bước 5: Lựa chọn ngôn ngữ tra cứu**

Tiếp theo, bạn hãy lựa chọn ngôn ngữ mà bạn muốn tra cứu và ngôn ngữ mà từ vựng sẽ được dịch sang.

**Bước 6: Cài đặt hotkey**

Vào settings trên Obsidian, tìm kiếm `look up` và chọn phím tắt mà bạn cảm thấy thuận tiện cho việc tra cứu.

**Bước 7: Tra cứu từ vựng với LLM Dictionary**

Sau khi thực hiện các bước trên, khi bạn bôi đen một từ hoặc cụm từ bất kì và dùng phím tắt đã thiết lập từ trước, LLM Dictionary sẽ tra cứu và hiện thị kết quả tại right sidebar.

## Tính năng chuyển văn bản thành giọng nói

Ngoài việc tra cứu từ vựng, LLM Dictionary còn có một tính năng vô cùng hữu ích khác: chuyển văn bản thành giọng nói. Tính năng này sẽ giúp bạn nghe được cách phát âm của từ vựng một cách chính xác, từ đó giúp bạn cải thiện kỹ năng nghe và nói của mình.

Tuy nhiên, để sử dụng được tính năng này, bạn cần bỏ ra một số tiền nhỏ. Với chỉ 300k, bạn có thể sử dụng được tính năng chuyển văn bản thành giọng nói mà không có giới hạn về thời gian cũng như số kí tự. Đây là một khoản đầu tư nhỏ so với hiệu quả mà bạn sẽ nhận được.

Tính năng chuyển văn bản thành giọng nói của LLM Dictionary có nhiều ưu điểm, bao gồm:

- Giúp bạn nghe được cách phát âm của từ vựng và câu với nhiều giọng đọc tự nhiên khác nhau.
- Không có giới hạn về thời gian cũng như số kí tự.
- Chỉ cần mua một lần và không chịu bất kì khoản phí nào thêm.
- Mở khoá tính năng này cũng là một cách để hỗ trợ người viết plugin có thêm kinh phí để duy trì và bổ sung thêm tính năng cho dự án trong tương lai.

### Phương thức thanh toán và donate

Để nhận mã kích hoạt tính năng TTS hoặc donate, bạn có thể chuyển tiền thông qua tài khoản ngân hàng bên dưới và liên hệ thông qua trang [Facebook](https://www.facebook.com/profile.php?id=100093832307685) của mình. Bạn cần lưu lại thông tin chuyển khoản để mình xác nhận.

![](https://i.imgur.com/1fYoKyS.png)

## Cách lưu lại từ vựng đã tra cứu trên Obsidian

Tại mục "Save" trên sidebar, bạn có thể tìm thấy một vài thiết lập cơ bản để lưu lại từ vựng.

LLM Dictionary sẽ giúp lưu lại từ vựng dưới dạng các notes trong Obsidian. Mỗi field tương ứng với một thông tin của từ vựng. Lưu ý, các field `{{Audio}}`, `{{Example Audio 1}}`, `{{Example Audio 2}}`, `{{Example Audio 3}}` chỉ có hiệu lực khi bạn mở khoá tính năng chuyển văn bản thành giọng nói.

Tại mục "Save" trên sidebar, bạn có thể tìm thấy một vài thiết lập cơ bản để lưu lại từ vựng. LLM Dictionary sẽ giúp lưu lại từ vựng dưới dạng các notes trong Obsidian. Mỗi field tương ứng với một thông tin của từ vựng.

### Cấu hình cơ bản

Trước khi lưu lại từ vựng, bạn phải cấu hình nơi lưu trữ note, audio và nội dung của note dựa trên các field cho sẵn. Lưu ý, các field `{{Audio}}`, `{{Example Audio 1}}`, `{{Example Audio 2}}`, `{{Example Audio 3}}` chỉ có hiệu lực khi bạn mở khoá tính năng chuyển văn bản thành giọng nói.

![](https://i.imgur.com/NMYUaec.png)

Đây là một setup mẫu và kết quả.

![](https://i.imgur.com/D3IJtFP.png)

![](https://i.imgur.com/P5m9QLj.png)

![](https://i.imgur.com/jVTd9sr.png)

### Tip

Khi lưu lại từ vựng bạn nên sử dụng đến field `{{Source}}` để thuận tiện cho việc ôn tập. Ví dụ những từ vựng này được tra cứu trong một note có tên là Daily Vocab. Khi mình xem lại note này, mình có thể dựa vào liên kết mà field `{{Source}}` để lại mà biết được mình đã tra cứu những từ nào.

![](https://i.imgur.com/dFa3c97.png)

## Đồng bộ và lưu từ vựng vào Anki

Mục này mình sẽ hướng dẫn cơ bản cách thiết lập note để lưu vào Anki, tuy nhiên mình sẽ không đi sâu vào chi tiết hướng dẫn cách sử dụng Anki. Mục tiêu là giúp bạn lưu từ vựng vào Anki.

Bước 1: Cài đặt addon [AnkiConnect](https://ankiweb.net/shared/info/2055492159) trên Anki

Bước 2: Thiết lập trên AnkiConnect theo mẫu sau

```json
{
  "apiKey": null,
  "apiLogPath": null,
  "ignoreOriginList": [],
  "webBindAddress": "127.0.0.1",
  "webBindPort": 8765,
  "webCorsOrigin": "http://localhost",
  "webCorsOriginList": ["http://localhost", "app://obsidian.md"]
}
```

Bước 3: Vào setting trên LLM-Dictionary, bật "Save the vocabulary to Anki"

![](https://i.imgur.com/ru8GU0k.png)

Bước 4: Tra từ và lưu lại từ. Lúc này, giao diên "save" sẽ có chút thay đổi.

![](https://i.imgur.com/fVbeXn4.png)

Bước 5: Nhập Anki Note Type và nhấn Get Fields. Lưu ý "AnkiConnect" sẽ mất kết nối sau một khoản thời gian nếu bạn không vào Anki. Nếu cảm thấy quá trình "Get Fields" lâu bạn nên nhấn vào lại Anki app. Bạn phải đảm bảo truy xuất được toàn bộ field của note type trước khi sang bước tiếp theo.

![](https://i.imgur.com/eMgtwqZ.png)

![](https://i.imgur.com/EGJp7rU.png)

Bước 6: Nhập thông tin bạn muốn đưa vào từng field của Note Type và nhấn "Save to Anki"

![](https://i.imgur.com/3b5pGkk.png)

![](https://i.imgur.com/twIsqZu.png)

Sau khi đã đồng bộ với Anki, bạn có thể vào note để cập nhật, mở flashcard trên anki, hoặc xóa anki flashcards

![](https://i.imgur.com/lj9n5EJ.png)
