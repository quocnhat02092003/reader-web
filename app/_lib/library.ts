export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  format: "Sách" | "Truyện tranh" | "Light novel" | "Tản văn";
  year: string;
  score: string;
  progress: string;
  pages: string;
  status: string;
  color: string;
  panel: string;
  coverImage: string;
  description: string;
  tags: string[];
};

export type Topic = {
  title: string;
  caption: string;
  color: string;
};

export type Shelf = {
  title: string;
  caption: string;
  href: string;
  books: Book[];
};

const openLibraryCover = (isbn: string) =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;

export const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/books", label: "Sách mới" },
  { href: "/comics", label: "Truyện tranh" },
  { href: "/genres", label: "Thể loại" },
  { href: "/introductions", label: "Giới thiệu sách" },
];

export const featuredBook: Book = {
  slug: "sau-mua-la-nhung-ngay-trong",
  title: "Sau Mưa Là Những Ngày Trong",
  subtitle: "After Rain Comes Clear Days",
  author: "Linh Vũ",
  format: "Sách",
  year: "2026",
  score: "9.1",
  progress: "Đang đọc",
  pages: "312 trang",
  status: "Nổi bật tuần này",
  color: "#f3c96d",
  panel: "#2d3142",
  coverImage: openLibraryCover("9780525559474"),
  description:
    "Một cuốn sách nhẹ nhưng không mỏng, đi qua mất mát, chữa lành và cách con người học lại việc tin vào những ngày bình thường.",
  tags: ["Chữa lành", "Đời sống", "Tâm lý"],
};

export const books: Book[] = [
  featuredBook,
  {
    slug: "thanh-pho-muc",
    title: "Thành Phố Mực",
    subtitle: "Ink City",
    author: "Minh An",
    format: "Truyện tranh",
    year: "2026",
    score: "8.7",
    progress: "Tập 18",
    pages: "168 trang",
    status: "Mới cập nhật",
    color: "#7b8fb5",
    panel: "#1f2737",
    coverImage: openLibraryCover("9781569319017"),
    description:
      "Một họa sĩ trẻ bước vào thành phố chỉ tồn tại trong bản thảo, nơi mọi nét vẽ đều có ký ức riêng.",
    tags: ["Fantasy", "Manga Việt", "Phiêu lưu"],
  },
  {
    slug: "ngon-den-cuoi-hanh-lang",
    title: "Ngọn Đèn Cuối Hành Lang",
    subtitle: "The Last Hallway Light",
    author: "Hạ Nguyên",
    format: "Light novel",
    year: "2025",
    score: "8.9",
    progress: "Chương 24",
    pages: "286 trang",
    status: "Đề cử",
    color: "#b56d73",
    panel: "#312028",
    coverImage: openLibraryCover("9781400079278"),
    description:
      "Một câu chuyện học đường pha bí ẩn, nơi những lá thư cũ mở ra bí mật của cả một lớp học.",
    tags: ["Học đường", "Bí ẩn", "Tình bạn"],
  },
  {
    slug: "duoi-tan-den-dem",
    title: "Dưới Tán Đèn Đêm",
    subtitle: "Under The Night Lights",
    author: "Nhi Phạm",
    format: "Sách",
    year: "2024",
    score: "8.5",
    progress: "Chương 12",
    pages: "244 trang",
    status: "Đọc tiếp",
    color: "#9a7b65",
    panel: "#2c2521",
    coverImage: openLibraryCover("9780375704024"),
    description:
      "Tản văn đô thị về những người trẻ đi qua thành phố, giữ lại vài điều dịu dàng sau giờ tan ca.",
    tags: ["Tản văn", "Đời thường", "Đô thị"],
  },
  {
    slug: "orbit-cafe",
    title: "Orbit Cafe",
    subtitle: "Orbit Cafe",
    author: "Haru Studio",
    format: "Truyện tranh",
    year: "2026",
    score: "8.8",
    progress: "Tập 31",
    pages: "132 trang",
    status: "Hot",
    color: "#5aa391",
    panel: "#1d332f",
    coverImage: openLibraryCover("9781974700523"),
    description:
      "Quán cà phê nằm ở trạm trung chuyển không gian, nơi mỗi vị khách để lại một câu chuyện.",
    tags: ["Sci-fi", "Slice of life", "Hài nhẹ"],
  },
  {
    slug: "ban-do-nhung-giac-mo",
    title: "Bản Đồ Những Giấc Mơ",
    subtitle: "Map Of Dreams",
    author: "Khoa Trần",
    format: "Sách",
    year: "2025",
    score: "8.4",
    progress: "Hoàn thành",
    pages: "356 trang",
    status: "Bán chạy",
    color: "#8b6fb3",
    panel: "#2a2338",
    coverImage: openLibraryCover("9780441172719"),
    description:
      "Một hành trình fantasy có tiết tấu nhanh, đi qua các vùng đất được tạo nên từ giấc mơ tập thể.",
    tags: ["Fantasy", "Phiêu lưu", "Bản đồ"],
  },
  {
    slug: "mot-ngay-ranh",
    title: "Một Ngày Rảnh",
    subtitle: "A Slow Day",
    author: "Tuệ Lam",
    format: "Tản văn",
    year: "2024",
    score: "8.2",
    progress: "Trang 96",
    pages: "192 trang",
    status: "Nhẹ nhàng",
    color: "#8a8d70",
    panel: "#292b21",
    coverImage: openLibraryCover("9780143130727"),
    description:
      "Những ghi chép nhỏ về việc sống chậm, nấu một bữa cơm và sắp xếp lại căn phòng tinh thần.",
    tags: ["Sống chậm", "Tản văn", "Gia đình"],
  },
  {
    slug: "nguoi-giu-thu-vien-mua-dong",
    title: "Người Giữ Thư Viện Mùa Đông",
    subtitle: "The Winter Librarian",
    author: "An Phương",
    format: "Sách",
    year: "2026",
    score: "9.0",
    progress: "Sắp ra mắt",
    pages: "408 trang",
    status: "Đặt trước",
    color: "#6e8194",
    panel: "#1d2630",
    coverImage: openLibraryCover("9780547928227"),
    description:
      "Một thủ thư trẻ nhận nhiệm vụ bảo vệ những cuốn sách biết tự viết tiếp số phận của người đọc.",
    tags: ["Fantasy", "Thư viện", "Bí ẩn"],
  },
  {
    slug: "tiem-sach-ben-song",
    title: "Tiệm Sách Bên Sông",
    subtitle: "Riverside Bookshop",
    author: "Mai Chi",
    format: "Sách",
    year: "2025",
    score: "8.6",
    progress: "Hoàn thành",
    pages: "276 trang",
    status: "Ấm áp",
    color: "#d68b63",
    panel: "#35231c",
    coverImage: openLibraryCover("9780061122415"),
    description:
      "Một tiệm sách nhỏ bên sông trở thành nơi hẹn của những người cần tìm lại điều mình từng bỏ quên.",
    tags: ["Đời thường", "Chữa lành", "Tiệm sách"],
  },
  {
    slug: "mat-ma-hoa-giay",
    title: "Mật Mã Hoa Giấy",
    subtitle: "Paper Flower Code",
    author: "Nhật Minh",
    format: "Truyện tranh",
    year: "2026",
    score: "8.3",
    progress: "Tập 9",
    pages: "148 trang",
    status: "Mới ra",
    color: "#d7a1b2",
    panel: "#38252e",
    coverImage: openLibraryCover("9781421597126"),
    description:
      "Một nhóm bạn giải mã những bông hoa giấy để lần theo bí mật của khu phố cũ.",
    tags: ["Trinh thám", "Bạn bè", "Truyện tranh"],
  },
];

export const topics: Topic[] = [
  { title: "Chữa lành", caption: "214 đầu sách", color: "#df63b7" },
  { title: "Manga mới", caption: "96 bộ truyện", color: "#3e58d6" },
  { title: "Kho tàng Việt", caption: "132 tác phẩm", color: "#7b66b2" },
  { title: "Top 10 tuần này", caption: "Đang thịnh hành", color: "#f2c642" },
  { title: "Cổ trang", caption: "72 truyện", color: "#a83a3c" },
  { title: "Sách điện tử mới", caption: "58 bản phát hành", color: "#35d24d" },
];

export const shelves: Shelf[] = [
  {
    title: "Sách Việt mới",
    caption: "Tác phẩm nổi bật từ tác giả Việt",
    href: "/books",
    books: [books[0], books[3], books[5], books[7]],
  },
  {
    title: "Truyện tranh đang lên",
    caption: "Các bộ truyện được theo dõi nhiều",
    href: "/comics",
    books: [books[1], books[4], books[2], books[6]],
  },
  {
    title: "Giới thiệu đáng đọc",
    caption: "Tóm tắt, cảm nhận và lý do nên đọc",
    href: "/introductions",
    books: [books[7], books[0], books[2], books[5]],
  },
];

export const stats = [
  { label: "Đầu sách", value: "12.4K" },
  { label: "Truyện tranh", value: "8.8K" },
  { label: "Bài giới thiệu", value: "1.2K" },
  { label: "Độc giả tuần", value: "64K" },
];

export const communityHighlights = [
  {
    reader: "Hong Anh",
    badge: "Thành viên lâu năm",
    book: books[0],
    comment:
      "Bản giới thiệu viết gọn, đọc xong muốn mở sách ngay. Đoạn về cách nhân vật tự chữa lành rất đúng tâm trạng.",
  },
  {
    reader: "Minh Khuê",
    badge: "Reviewer",
    book: books[1],
    comment:
      "Thành phố trong truyện có không khí riêng, mỗi chương giống như một khung tranh có nhịp rất cuốn.",
  },
  {
    reader: "Gia Huy",
    badge: "Đọc 42h",
    book: books[7],
    comment:
      "Ý tưởng thư viện mùa đông rất hợp để làm series dài. Phần giới thiệu đủ kích thích mà không spoil.",
  },
  {
    reader: "Bảo Ngọc",
    badge: "Manga fan",
    book: books[4],
    comment:
      "Orbit Cafe nhẹ nhàng mà vẫn lạ. Mình thích cách mỗi khách hàng mở ra một câu chuyện khác nhau.",
  },
  {
    reader: "An Nhiên",
    badge: "Top bình luận",
    book: books[2],
    comment:
      "Bí ẩn học đường nhưng không quá nặng. Nhân vật phụ có nhiều đất diễn nên đọc rất đã.",
  },
];

export const popularTitles = [books[0], books[1], books[2], books[4], books[7]];

export const favoriteTitles = [books[4], books[0], books[5], books[3], books[7]];

export const hotGenres = [
  { label: "Chữa lành", color: "#b23e77" },
  { label: "Phiêu lưu", color: "#347dd9" },
  { label: "Light novel", color: "#8257c8" },
  { label: "Đời thường", color: "#9db64f" },
  { label: "Tình cảm", color: "#b59066" },
];

export const liveComments = [
  {
    reader: "Yến Nhi",
    book: books[7],
    text: "Đọc đoạn mở đầu thấy lạnh đúng nghĩa mùa đông.",
  },
  {
    reader: "Ca Dao",
    book: books[1],
    text: "Nét dựng thế giới ổn, mong có thêm bản in màu.",
  },
  {
    reader: "Hạnh",
    book: books[0],
    text: "Bài giới thiệu không spoil, rất dễ chọn sách.",
  },
  {
    reader: "Huy Nguyễn",
    book: books[5],
    text: "Fantasy dễ đọc, nhịp nhanh hơn mình tưởng.",
  },
];

export const newReleaseBooks = [
  books[7],
  books[1],
  books[4],
  books[2],
  books[5],
  books[0],
  books[9],
  books[8],
  books[6],
  books[3],
];

export const topSeriesBooks = [
  books[1],
  books[4],
  books[2],
  books[5],
  books[7],
  books[0],
  books[8],
  books[9],
  books[3],
  books[6],
];

export function getBook(slug: string) {
  return books.find((book) => book.slug === slug) ?? featuredBook;
}
