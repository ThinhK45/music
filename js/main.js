// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Thay Lòng",
      singer: "Nal x TVK",
      path: "https://archive.org/download/thaylong-2/thaylong%20%282%29.mp3",
      image: "https://data.chiasenhac.com/data/cover/151/150229.jpg",
    },
    {
      name: "CÔ ĐƠN DÀNH CHO AI",
      singer: "LEE KEN x NAL",
      path: "https://archive.org/download/thaylong-2/codon.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/8/b/3/3/8b337aca4250fde26de3dfb1d6eca697.jpg",
    },
    {
      name: "HOA TÀN TÌNH TAN",
      singer: "Giang Jolee",
      path: "https://archive.org/download/thaylong-2/hoatantinhtan.mp3",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
    },
    {
      name: "VUI LẮM NHA",
      singer: "HƯƠNG LY",
      path: "https://archive.org/download/vuilamnha/vuilamnha.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/d/2/0/3/d203dca5fe9fbb2190b3b9b729936c53.jpg",
    },
    {
      name: "Anh Thương Em Em Thương Ai (Orinn Remix)",
      singer: "Đinh Tùng Huy",
      path: "https://archive.org/download/thaylong-2/anhthuongem.mp3",
      image:
        "https://thoidai.com.vn/stores/news_dataimages/thuy.dang/072019/23/16/5426_b12d716b2c97575bbb278c2a49d45d61.jpg",
    },
    {
      name: "Tình Sầu Thiên Thu Muôn Lối Remix",
      singer: "Doãn Hiếu ft.LongDrae",
      path: "https://archive.org/download/thaylong-2/t%C3%ADnhauthienthu.mp3",
      image: "https://i.scdn.co/image/ab67616d0000b2732a1b6175e5bbffea73098736",
    },
    {
      name: "Có Chàng Trai Viết Lên Cây",
      singer: "Phan Mạnh Quỳnh",
      path: "https://archive.org/download/cochangtraivietlencay/cochangtraivietlencay.mp3",
      image: "https://i.ytimg.com/vi/0VC6euBtKkk/maxresdefault.jpg",
    },
    {
      name: "Ít Nhưng Dài Lâu",
      singer: "Yan Nguyễn",
      path: "https://archive.org/download/cochangtraivietlencay/itnhungdailau%20%282%29.mp3",
      image: "https://i.scdn.co/image/ab67616d0000b27383e353d4f36020c8a8b74a83",
    },
    {
      name: "Thế Giới Ảo Tình Yêu Thật",
      singer: "Trịnh Đình Quang",
      path: "https://archive.org/download/cochangtraivietlencay/thegioiaotinhthat.mp3",
      image:
        "https://i0.wp.com/i.ytimg.com/vi/cIZ1IDD35Y8/hqdefault.jpg?resize=854%2C480&ssl=1",
    },
    {
      name: "Senbonzakura",
      singer: "Lindsey Stirling",
      path: "https://archive.org/download/cochangtraivietlencay/senbonzakura.mp3",
      image:
        "https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_topic/thumbnail_title-6e402c277c9a-1592296049904-Jegh031s.png",
    },
    {
      name: "Tình Cảm Khó Nói",
      singer: "Tam Hổ",
      path: "https://archive.org/download/cochangtraivietlencay/tinhcamkhonoi.mp3",
      image:
        "https://photo-zmp3.zadn.vn/thumb_video/2/7/278457062cc8b0afb87c3904939c5947_1430986101.jpg",
    },
    {
      name: "Tình Ka",
      singer: "Danhka",
      path: "https://archive.org/download/cochangtraivietlencay/tinhKa.mp3",
      image: "https://i.ytimg.com/vi/Ootq-ySbgZw/maxresdefault.jpg",
    },
    {
      name: "Yết Vô Hiết",
      singer: "Châu Dương",
      path: "https://archive.org/download/cochangtraivietlencay/yetvohiet.mp3",
      image: "https://i.ytimg.com/vi/LPw7EvyoMgs/maxresdefault.jpg",
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};

app.start();
