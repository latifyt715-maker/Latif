document.addEventListener("DOMContentLoaded", () => {
    const profileCard = document.querySelector(".profile-card");
    const profileImage = document.querySelector(".profile-image");

    if (!profileCard || !profileImage) return;

    /* =========================
       BUAT 2 MATA VENOM
    ========================= */

    // Hapus mata lama jika ada
    profileImage.querySelectorAll(
        ".venom-eye, .venom-eye-left, .venom-eye-right, .venom-mouth, .venom-teeth"
    ).forEach(el => el.remove());

    const leftEye = document.createElement("span");
    const rightEye = document.createElement("span");

    leftEye.className = "venom-eye venom-eye-left";
    rightEye.className = "venom-eye venom-eye-right";

    profileImage.appendChild(leftEye);
    profileImage.appendChild(rightEye);

    /* =========================
       STYLE MATA
    ========================= */

    const venomStyle = document.createElement("style");

    venomStyle.textContent = `
        .profile-image {
            position: relative;
            overflow: hidden;
        }

        .venom-eye {
            position: absolute;
            width: 48px;
            height: 25px;

            background: white;

            border-radius: 80% 15% 70% 20%;

            box-shadow:
                0 0 8px rgba(255,255,255,.9),
                0 0 20px rgba(255,255,255,.7),
                0 0 35px rgba(255,255,255,.4);

            opacity: 0;
            z-index: 20;

            pointer-events: none;

            /* ANGLE SAMA */
            transform:
                translate(-50%, -50%)
                rotate(-12deg)
                skewX(-8deg);

            transition:
                opacity .25s ease,
                left .15s ease-out,
                top .15s ease-out,
                width .2s ease,
                height .2s ease;
        }

        .venom-eye-left {
            left: 37%;
            top: 43%;
        }

        .venom-eye-right {
            left: 63%;
            top: 43%;
        }

        .profile-card.venom-active .venom-eye {
            opacity: 1;
        }

        /* Efek mata sedikit menyala */
        .profile-card.venom-active .venom-eye {
            animation: venomEyePulse 1.5s infinite alternate;
        }

        @keyframes venomEyePulse {
            from {
                box-shadow:
                    0 0 8px rgba(255,255,255,.8),
                    0 0 18px rgba(255,255,255,.5);
            }

            to {
                box-shadow:
                    0 0 12px white,
                    0 0 28px rgba(255,255,255,.9),
                    0 0 45px rgba(255,255,255,.4);
            }
        }

        /* Hilangkan mulut/gigi */
        .venom-mouth,
        .venom-teeth {
            display: none !important;
        }
    `;

    document.head.appendChild(venomStyle);

    /* =========================
       MOUSE TRACKING
    ========================= */

    profileCard.addEventListener("mouseenter", () => {
        profileCard.classList.add("venom-active");
    });

    profileCard.addEventListener("mousemove", (e) => {
        const rect = profileCard.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Posisi kursor dalam persen
        const percentX = x / rect.width;
        const percentY = y / rect.height;

        /*
         * Mata bergerak sedikit mengikuti kursor,
         * tetapi tetap simetris.
         */
        const moveX = (percentX - 0.5) * 12;
        const moveY = (percentY - 0.5) * 8;

        leftEye.style.left = `calc(37% + ${moveX}px)`;
        leftEye.style.top = `calc(43% + ${moveY}px)`;

        rightEye.style.left = `calc(63% + ${moveX}px)`;
        rightEye.style.top = `calc(43% + ${moveY}px)`;

        /* Tilt kartu */
        const rotateY = (percentX - 0.5) * 10;
        const rotateX = (0.5 - percentY) * 10;

        profileCard.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.02)
        `;

        /* Intensitas Venom */
        const intensity =
            Math.sqrt(
                Math.pow(percentX - 0.5, 2) +
                Math.pow(percentY - 0.5, 2)
            );

        profileCard.style.setProperty(
            "--venom-intensity",
            Math.min(intensity * 2, 1)
        );
    });

    /* =========================
       KURSOR KELUAR
    ========================= */

    profileCard.addEventListener("mouseleave", () => {
        profileCard.classList.remove("venom-active");

        leftEye.style.left = "37%";
        leftEye.style.top = "43%";

        rightEye.style.left = "63%";
        rightEye.style.top = "43%";

        profileCard.style.transform = "";
    });
});