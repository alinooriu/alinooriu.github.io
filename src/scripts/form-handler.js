document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('whatsappForm');
    const submitBtn = form.querySelector('.btn-submit');
    const cardContainer = document.querySelector('.contact-card');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();

        submitBtn.disabled = true;
        submitBtn.querySelector('span').innerText = "در حال ثبت درخواست...";

        const formspreeUrl = "https://formspree.io/f/xvzjndrg"; 

        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: fullName,
                    phone: phoneNumber
                })
            });

            if (response.ok) {
                cardContainer.innerHTML = `
                    <div style="text-align: center; animation: fadeIn 0.6s ease; padding: 20px 0;">
                        <div style="width: 60px; height: 60px; background: radial-gradient(circle, #F3A847 0%, #9E6B28 100%); border-radius: 50%; margin: 0 auto 24px auto; display: flex; align-items: center; justify-content: center; color: #000; font-size: 24px; font-weight: bold;">✓</div>
                        <h2 style="font-size: 1.6rem; margin-bottom: 12px; color: #FFF; font-weight: 700;">درخواست شما ثبت شد</h2>
                        <p style="color: #A0A0A5; font-size: 0.95rem; line-height: 1.8; font-weight: 300;">مشخصات شما با موفقیت دریافت شد. به زودی جهت هماهنگی و ارسال کاتالوگ با شما تماس می‌گیریم.</p>
                    </div>
                `;
            } else {
                throw new Error('خطا در ارسال');
            }

        } catch (error) {
            alert('مشکلی در ثبت درخواست پیش آمد. لطفاً اتصال خود را بررسی کرده و مجدداً تلاش کنید.');
            submitBtn.disabled = false;
            submitBtn.querySelector('span').innerText = "ثبت درخواست مشاوره";
        }
    });
});