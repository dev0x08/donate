// Xử lý menu điều hướng trên mobile
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Đóng menu khi click vào link (trên mobile)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
        }
    });
});

// Đóng menu khi click ra ngoài (trên mobile)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !navToggle.contains(e.target) && 
        !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Các hàm JavaScript từ file gốc
function showNotification(message, success = true) {
    const notif = document.getElementById('notification');
    const notifSpan = notif.querySelector('span');
    const notifIcon = notif.querySelector('i');

    notifSpan.textContent = message;
    
    notif.style.backgroundColor = success ? 'var(--primary)' : '#ff4444';
    notif.style.color = success ? '#000' : '#fff';
    notifIcon.className = success ? 'fas fa-check-circle' : 'fas fa-times-circle';

    notif.classList.add('show');

    setTimeout(() => {
        notif.classList.remove('show');
    }, 3000);
}

function copyScript(textToCopy) {
    const tempInput = document.createElement("input");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    showNotification("Đã copy số tài khoản!", true);
}

function toggleCollapse(containerId) {
    const container = document.getElementById(containerId);
    const body = container.querySelector('.payment-body');
    
    container.classList.toggle('collapsed');

    if (container.classList.contains('collapsed')) {
        body.style.maxHeight = body.scrollHeight + "px";
        
        requestAnimationFrame(() => {
            body.style.maxHeight = '0';
            body.style.paddingTop = '0';
            body.style.paddingBottom = '0';
        });

    } else {
        body.style.paddingTop = '30px'; 
        body.style.paddingBottom = '30px';
        
        const newHeight = body.scrollHeight + 1;
        
        body.style.maxHeight = newHeight + "px";

        const handler = () => {
            body.style.maxHeight = '2000px'; 
            body.removeEventListener('transitionend', handler);
        };
        body.addEventListener('transitionend', handler);
    }
}

// Hiển thị QR Code
function showQrCode(title, accountNo, owner) {
    const modal = document.getElementById('qr-modal');
    const qrImage = document.getElementById('qr-image');
    
    document.getElementById('qr-title').textContent = `Mã QR ${title}`;
    document.getElementById('qr-number').textContent = accountNo;
    document.getElementById('qr-owner').textContent = owner;
    
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${accountNo}`;
    
    modal.classList.add('active');
}

function closeQrCode() {
    const modal = document.getElementById('qr-modal');
    modal.classList.remove('active');
}

// Mở modal chi tiết với nội dung được nhúng trực tiếp
function openDownloadModal(appType) {
    const modal = document.getElementById('download-modal');
    const contentDiv = document.getElementById('ipa-details-content');
    
    let content = '';
    
    // Nội dung cho từng ứng dụng
    switch(appType) {
        case 'lienquan':
            content = `
                <div style="text-align: center;">
                    <h3 style="margin-bottom: 15px; color: var(--primary);">Liên Quân Mobile x NAPO Team</h3>
                    <div style="background: rgba(103, 128, 254, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h4 style="margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                            <i class="fas fa-bolt" style="color: var(--primary);"></i>
                            Tính năng nổi bật
                        </h4>
                        <ul style="text-align: left; color: var(--text-muted); line-height: 1.8;">
                            <li>🔹 Mod menu đầy đủ tính năng</li>
                            <li>🔹 Tự động瞄准 (Auto Aim)</li>
                            <li>🔹 Xem tường (Wallhack)</li>
                            <li>🔹 Tốc độ di chuyển</li>
                            <li>🔹 Không giật (No Recoil)</li>
                            <li>🔹 Tầm nhìn rộng hơn</li>
                        </ul>
                    </div>
                    <div style="background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="color: var(--success); margin: 0;">
                            <i class="fas fa-check-circle"></i> Đã cập nhật phiên bản mới nhất
                        </p>
                    </div>
                </div>
            `;
            
            // Thêm nút tải về cho lienquan
            content += `
                <div class="btn-group" style="justify-content: center; gap: 15px; margin-top: 25px;">
                    <button class="btn btn-primary" onclick="downloadApp('${appType}')" style="padding: 12px 24px;">
                        <i class="fas fa-download"></i> Tải Về Ngay
                    </button>
                    <button class="btn btn-outline" onclick="closeDownloadModal()" style="padding: 12px 24px;">
                        <i class="fas fa-times"></i> Đóng
                    </button>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: rgba(59, 130, 246, 0.05); border-radius: 8px;">
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">
                        <i class="fas fa-info-circle"></i> 
                        Sau khi tải về, vui lòng làm theo hướng dẫn cài đặt IPA
                    </p>
                </div>
            `;
            break;
            
        case 'petsim':
            content = `
                <div style="text-align: center;">
                    <h3 style="margin-bottom: 15px; color: var(--primary);">Pet Simulator 99</h3>
                    <div style="background: rgba(103, 128, 254, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h4 style="margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                            <i class="fas fa-paw" style="color: var(--primary);"></i>
                            Tính năng nổi bật
                        </h4>
                        <ul style="text-align: left; color: var(--text-muted); line-height: 1.8;">
                            <li>🔹 Auto farm tự động</li>
                            <li>🔹 Auto hatch pet</li>
                            <li>🔹 Tăng tốc độ di chuyển</li>
                            <li>🔹 Nhân đôi tiền vàng</li>
                            <li>🔹 Bỏ qua quảng cáo</li>
                            <li>🔹 Mở khóa tất cả khu vực</li>
                        </ul>
                    </div>
                    <div style="background: rgba(59, 130, 246, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="color: var(--primary); margin: 0;">
                            <i class="fas fa-star"></i> Phiên bản mới - Cập nhật tính năng
                        </p>
                    </div>
                </div>
            `;
            
            // Thêm nút tải về cho petsim
            content += `
                <div class="btn-group" style="justify-content: center; gap: 15px; margin-top: 25px;">
                    <button class="btn btn-primary" onclick="downloadApp('${appType}')" style="padding: 12px 24px;">
                        <i class="fas fa-download"></i> Tải Về Ngay
                    </button>
                    <button class="btn btn-outline" onclick="closeDownloadModal()" style="padding: 12px 24px;">
                        <i class="fas fa-times"></i> Đóng
                    </button>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: rgba(59, 130, 246, 0.05); border-radius: 8px;">
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">
                        <i class="fas fa-info-circle"></i> 
                        Sau khi tải về, vui lòng làm theo hướng dẫn cài đặt IPA
                    </p>
                </div>
            `;
            break;
            
        case 'kinglegacy':
            content = `
                <div style="text-align: center;">
                    <h3 style="margin-bottom: 15px; color: var(--primary);">King Legacy Hub</h3>
                    <div style="background: rgba(103, 128, 254, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h4 style="margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                            <i class="fas fa-crown" style="color: var(--primary);"></i>
                            Tính năng VIP
                        </h4>
                        <ul style="text-align: left; color: var(--text-muted); line-height: 1.8;">
                            <li>👑 Auto farm level tự động</li>
                            <li>👑 Teleport đến boss</li>
                            <li>👑 Tự động đánh boss</li>
                            <li>👑 Hack Beli không giới hạn</li>
                            <li>👑 Mở khóa tất cả fruit</li>
                            <li>👑 God mode (Bất tử)</li>
                            <li>👑 Tốc độ di chuyển cực nhanh</li>
                        </ul>
                    </div>
                    <div style="background: rgba(245, 158, 11, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="color: var(--warning); margin: 0;">
                            <i class="fas fa-crown"></i> Tính năng VIP - Yêu cầu Donate
                        </p>
                    </div>
                </div>
            `;
            
            // Thêm nút tải về cho kinglegacy
            content += `
                <div class="btn-group" style="justify-content: center; gap: 15px; margin-top: 25px;">
                    <button class="btn btn-primary" onclick="downloadApp('${appType}')" style="padding: 12px 24px;">
                        <i class="fas fa-download"></i> Tải Về Ngay
                    </button>
                    <button class="btn btn-outline" onclick="closeDownloadModal()" style="padding: 12px 24px;">
                        <i class="fas fa-times"></i> Đóng
                    </button>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: rgba(59, 130, 246, 0.05); border-radius: 8px;">
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">
                        <i class="fas fa-info-circle"></i> 
                        Sau khi tải về, vui lòng làm theo hướng dẫn cài đặt IPA
                    </p>
                </div>
            `;
            break;
            
        default:
            // Chỉ hiển thị thông báo lỗi, không có nút tải về
            content = `
                <div style="text-align: center; padding: 40px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #ff4444; margin-bottom: 20px;"></i>
                    <h3 style="color: #ff4444;">Thông tin không khả dụng</h3>
                    <p style="color: var(--text-muted); margin-bottom: 25px;">Không thể tải thông tin chi tiết cho ứng dụng này.</p>
                    <div style="display: flex; justify-content: center;">
                        <button class="btn btn-outline" onclick="closeDownloadModal()" style="padding: 12px 24px;">
                            <i class="fas fa-times"></i> Đóng
                        </button>
                    </div>
                </div>
            `;
    }
    
    contentDiv.innerHTML = content;
    modal.classList.add('active');
}

// Hàm tải về (giả lập)
function downloadApp(appType) {
    let appName = '';
    switch(appType) {
        case 'lienquan':
            appName = 'Liên Quân Mobile';
            break;
        case 'petsim':
            appName = 'Pet Simulator 99';
            break;
        case 'kinglegacy':
            appName = 'King Legacy Hub';
            break;
        default:
            appName = 'Ứng dụng';
    }
    
    showNotification(`Đang bắt đầu tải ${appName}...`, true);
    
    // Giả lập quá trình tải về
    setTimeout(() => {
        showNotification(`Tải về ${appName} thành công!`, true);
        closeDownloadModal();
    }, 2000);
}

function closeDownloadModal() {
    const modal = document.getElementById('download-modal');
    modal.classList.remove('active');
}

function openGuideModal() {
    const modal = document.getElementById('guide-modal');
    modal.classList.add('active');
}

function closeGuideModal() {
    const modal = document.getElementById('guide-modal');
    modal.classList.remove('active');
}

function toggleGuideAccordion(element) {
    const item = element.parentNode;
    const content = item.querySelector('.guide-accordion-content');
    
    if (item.classList.contains('active')) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
    } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

function closeNotice() {
    const noticeSection = document.getElementById('notice-section');
    noticeSection.style.display = 'none';
}

// Đóng modal khi click ra ngoài
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') || 
        e.target.classList.contains('download-modal') || 
        e.target.classList.contains('guide-modal')) {
        closeQrCode();
        closeDownloadModal();
        closeGuideModal();
    }
});

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', () => {
    const donateSection = document.getElementById('donate-section');
    const paymentBody = donateSection.querySelector('.payment-body');
    
    paymentBody.style.maxHeight = '2000px';
});
