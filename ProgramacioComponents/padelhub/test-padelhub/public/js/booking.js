document.addEventListener('DOMContentLoaded', () => {
    const bookingDate = document.querySelector('.booking-date');
    const timeSlots = document.getElementById('time-slots');
    const courtGrid = document.getElementById('court-grid');

    const stepHour = document.getElementById('step-hour');
    const stepCourt = document.getElementById('step-court');

    const summaryDate = document.getElementById('summary-date');
    const summaryTime = document.getElementById('summary-time');
    const summaryCourt = document.getElementById('summary-court');
    const summaryTotal = document.getElementById('summary-total');
    const summaryDuration = document.querySelector('.summary-list li:nth-child(5) strong'); // <--- tu elemento de duración

    const courtIdInput = document.getElementById('court_id');
    const startTimeInput = document.getElementById('start_time');
    const endTimeInput = document.getElementById('end_time');

    const confirmBtn = document.querySelector('.btn-confirm');
    const bookingForm = document.querySelector('form');

    const endTimeWrapper = document.getElementById('end-time-wrapper');
    const endTimeSelect = document.getElementById('end_time_select');

    /* ---------- Stepper ---------- */
    const steps = document.querySelectorAll('.booking-stepper .step');
    function setStep(stepNumber) {
        steps.forEach(s => {
            const n = parseInt(s.dataset.step, 10);
            s.classList.toggle('active', n <= stepNumber);
        });
    }

    bookingForm.addEventListener('submit', () => setStep(4));

    /* ---------- Fecha ---------- */
    bookingDate.min = new Date().toISOString().split('T')[0];

    bookingDate.addEventListener('change', () => {
        summaryDate.textContent = bookingDate.value;
        resetAfterDate();
        loadHours();
    });

    function resetAfterDate() {
        timeSlots.innerHTML = '';
        courtGrid.innerHTML = '';
        stepCourt.style.display = 'none';
        confirmBtn.disabled = true;
        endTimeWrapper.style.display = 'none';
        endTimeSelect.innerHTML = '<option value="">+1 hora (por defecto)</option>';
        startTimeInput.value = '';
        endTimeInput.value = '';
        updateDuration(); // <--- resetea duración también
    }

    /* ---------- Duración ---------- */
    function updateDuration() {
        const startTime = startTimeInput.value;
        const endTime = endTimeInput.value;

        if (startTime && endTime) {
            const start = new Date(`1970-01-01T${startTime}:00`);
            const end = new Date(`1970-01-01T${endTime}:00`);
            let diff = (end - start) / (1000 * 60 * 60); // diferencia en horas
            if (diff <= 0) diff += 24; // en caso de pasar de medianoche
            summaryDuration.textContent = diff + ' h';
        } else {
            summaryDuration.textContent = '—';
        }
    }

    startTimeInput.addEventListener('change', updateDuration);
    endTimeInput.addEventListener('change', updateDuration);
    endTimeSelect.addEventListener('change', function() {
        endTimeInput.value = this.value;
        updateDuration();
    });

    /* ---------- Horas ---------- */
    function loadHours() {
        fetch('/reservas/horas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({
                date: bookingDate.value,
                club_id: document.querySelector('input[name="club_id"]').value
            })
        })
        .then(res => res.json())
        .then(hours => {
            timeSlots.innerHTML = '';
            stepHour.style.display = 'block';
            setStep(2);

            hours.forEach(hour => {
                const card = document.createElement('button');
                card.type = 'button';
                card.className = 'time-card';
                card.textContent = hour;

                card.onclick = () => {
                    document.querySelectorAll('.time-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');

                    startTimeInput.value = hour;
                    endTimeInput.value = '';
                    summaryTime.textContent = hour;
                    confirmBtn.disabled = true;
                    updateDuration();

                    generateEndTimes(hour, hours);
                    setStep(2);
                };

                timeSlots.appendChild(card);
            });
        });
    }

    /* ---------- Hora fin (opcional) ---------- */
    function generateEndTimes(startHour, hours) {
        endTimeSelect.innerHTML = '<option value="">+1 hora (por defecto)</option>';
        const startIndex = hours.indexOf(startHour);

        for (let i = startIndex + 1; i < hours.length; i++) {
            const option = document.createElement('option');
            option.value = hours[i];
            option.textContent = hours[i];
            endTimeSelect.appendChild(option);
        }

        endTimeWrapper.style.display = 'block';
        loadCourts(startHour);
    }

    /* ---------- Pistas ---------- */
    function loadCourts(hour) {
        fetch('/reservas/pistas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({
                date: bookingDate.value,
                hour: hour,
                end_time: endTimeInput.value,
                club_id: document.querySelector('input[name="club_id"]').value
            })
        })
        .then(res => res.json())
        .then(courts => {
            courtGrid.innerHTML = '';
            stepCourt.style.display = 'block';
            setStep(3);

            courts.forEach(court => {
                const card = document.createElement('article');
                card.className = 'court-card';
                card.innerHTML = `
                    <h4>${court.name}</h4>
                    <div class="court-meta">
                        <span>${court.type}</span>
                        <span class="court-price">${court.price_per_hour} €/h</span>
                    </div>
                `;

                card.onclick = () => {
                    document.querySelectorAll('.court-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');

                    courtIdInput.value = court.id;
                    summaryCourt.textContent = court.name;
                    summaryTotal.textContent = court.price_per_hour + ' €';
                    confirmBtn.disabled = false;
                    setStep(3);
                };

                courtGrid.appendChild(card);
            });
        });
    }

});
