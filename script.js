
document.addEventListener("DOMContentLoaded", function () {

    // NOMOR WHATSAPP WARUNG
    const nomorWA = "087887099156";

    // FILTER KATEGORI MENU
    const tombolKategori = document.querySelectorAll(".kategori-btn");
    const semuaMenu = document.querySelectorAll(".menu-card");

    tombolKategori.forEach(function (tombol) {
        tombol.addEventListener("click", function () {

            tombolKategori.forEach(function (btn) {
                btn.classList.remove("active");
            });

            tombol.classList.add("active");

            const kategori = tombol.dataset.kategori;

            semuaMenu.forEach(function (menu) {
                if (
                    kategori === "Semua" ||
                    menu.dataset.kategori === kategori
                ) {
                    menu.style.display = "";
                } else {
                    menu.style.display = "none";
                }
            });
        });
    });


    // KERANJANG PESANAN
    let keranjang = [];

    const isiKeranjang = document.getElementById("isi-keranjang");
    const totalElement = document.getElementById("total");
    const jumlahNav = document.getElementById("jumlah-nav");

    function rupiah(angka) {
        return "Rp" + angka.toLocaleString("id-ID");
    }

    function tampilkanKeranjang() {

        isiKeranjang.innerHTML = "";

        let total = 0;
        let jumlah = 0;

        if (keranjang.length === 0) {
            isiKeranjang.innerHTML = `
                <div class="cart-empty">
                    <span>🛒</span>
                    <h3>Keranjang masih kosong</h3>
                    <p>Yuk, pilih menu makanan favoritmu!</p>
                    <a href="#menu" class="btn-primary">Pilih Menu</a>
                </div>
            `;
        }

        keranjang.forEach(function (item, index) {

            total += item.harga * item.jumlah;
            jumlah += item.jumlah;

            isiKeranjang.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h3>${item.nama}</h3>
                        <p>${rupiah(item.harga)}</p>
                    </div>

                    <div class="jumlah-menu">
                        <button class="kurang" data-index="${index}">-</button>
                        <span>${item.jumlah}</span>
                        <button class="tambah" data-index="${index}">+</button>
                    </div>

                    <button class="hapus-menu" data-index="${index}">
                        Hapus
                    </button>
                </div>
            `;
        });

        totalElement.textContent = rupiah(total);
        jumlahNav.textContent = jumlah;
    }


    // TAMBAH MENU
    document.querySelectorAll(".btn-tambah").forEach(function (tombol) {

        tombol.addEventListener("click", function () {

            const kartu = tombol.closest(".menu-card");

            const nama = kartu.querySelector("h3").textContent;
            const hargaTeks = kartu.querySelector(".harga").textContent;
            const harga = Number(hargaTeks.replace(/[^0-9]/g, ""));

            const menuAda = keranjang.find(function (item) {
                return item.nama === nama;
            });

            if (menuAda) {
                menuAda.jumlah++;
            } else {
                keranjang.push({
                    nama: nama,
                    harga: harga,
                    jumlah: 1
                });
            }

            tampilkanKeranjang();
        });
    });


    // TAMBAH, KURANG, DAN HAPUS MENU
    isiKeranjang.addEventListener("click", function (e) {

        const index = Number(e.target.dataset.index);

        if (e.target.classList.contains("tambah")) {
            keranjang[index].jumlah++;
        }

        else if (e.target.classList.contains("kurang")) {
            keranjang[index].jumlah--;

            if (keranjang[index].jumlah <= 0) {
                keranjang.splice(index, 1);
            }
        }

        else if (e.target.classList.contains("hapus-menu")) {
            keranjang.splice(index, 1);
        }

        tampilkanKeranjang();
    });


    // PESAN MELALUI WHATSAPP
    function pesanWhatsApp() {

        if (keranjang.length === 0) {
            alert("Keranjang kamu masih kosong!");
            return;
        }

        let pesan = "Halo, saya ingin memesan:\n\n";
        let total = 0;

        keranjang.forEach(function (item) {

            const subtotal = item.harga * item.jumlah;

            pesan += item.nama + " x" + item.jumlah;
            pesan += " = " + rupiah(subtotal) + "\n";

            total += subtotal;
        });

        pesan += "\nTotal Pesanan: " + rupiah(total);
        pesan += "\nTerima kasih.";

        const linkWA =
            "https://wa.me/" + nomorWA +
            "?text=" + encodeURIComponent(pesan);

        window.open(linkWA, "_blank");
    }

    document.getElementById("btn-checkout")
        .addEventListener("click", pesanWhatsApp);


    // TOMBOL HUBUNGI WHATSAPP
    const kontakWA = document.getElementById("kontak-wa");

    kontakWA.addEventListener("click", function (e) {
        e.preventDefault();

        const pesan = "Halo, saya ingin bertanya tentang menu Warung Makan AGZ.";

        window.open(
            "https://wa.me/" + nomorWA +
            "?text=" + encodeURIComponent(pesan),
            "_blank"
        );
    });


    // STATUS JAM OPERASIONAL
    const statusWarung = document.getElementById("status-warung");

    function cekJamWarung() {
        const sekarang = new Date();
        const jam = sekarang.getHours();

        if (jam >= 8 && jam < 22) {
            statusWarung.textContent = "Warung Sedang Buka";
        } else {
            statusWarung.textContent = "Warung Sedang Tutup";
        }
    }

    cekJamWarung();


    // ANIMASI SCROLL
    const elemenReveal = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("tampil");
                    observer.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.15
        });

        elemenReveal.forEach(function (elemen) {
            observer.observe(elemen);
        });
    } else {
        elemenReveal.forEach(function (elemen) {
            elemen.classList.add("tampil");
        });
    }


    // TOMBOL KEMBALI KE ATAS
    const tombolAtas = document.getElementById("back-top");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            tombolAtas.classList.add("show");
        } else {
            tombolAtas.classList.remove("show");
        }
    });

    tombolAtas.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // MENU NAVBAR HP
    const tombolToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    tombolToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("active");
        });
    });


    // TAMPILKAN KERANJANG AWAL
    tampilkanKeranjang();

});
