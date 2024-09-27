// Utility function untuk mendapatkan angka acak antara min dan max
const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Class Binar untuk menambahkan tanggal "availableAt" secara acak ke dalam data mobil
class Binar {
	static populateCars = cars => {
		return cars.map(car => {
			const currentDate = new Date();
			const randomDays = getRandomInt(0, 7); // Hari acak dari sekarang hingga 7 hari ke depan
			const availableAt = new Date(currentDate.getTime() + randomDays * 24 * 60 * 60 * 1000); // Tambahkan hari acak ke tanggal sekarang

			// Log data mobil dengan tanggal availableAt yang baru
			console.log(`Mobil: ${JSON.stringify({ ...car, availableAt }, null, 2)}`);

			return {
				...car,
				availableAt, // Set tanggal availableAt yang baru
			};
		});
	};
}

// Fungsi untuk mengambil data mobil dari file JSON eksternal
const fetchCars = async () => {
	try {
		const response = await fetch('./data/cars.json'); // Path ke file JSON
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const cars = await response.json();

		// Populate data mobil dengan tanggal availableAt yang acak
		return Binar.populateCars(cars);
	} catch (error) {
		console.error('Error fetching JSON:', error);
	}
};

// Fungsi untuk menampilkan card mobil ke halaman
const renderCar = car => {
	const carContainer = document.getElementById('car-container');

	// Template card mobil
	const carCard = `
			<div class="d-flex flex-column gap-3 card col-12 card-col p-4" style="height: 100%;">
				<div class="d-grid gap-3" style="flex-grow: 1;">
					<img src="${car.image}" alt="${car.manufacture} ${car.model}" class="img-fluid" style="height: 200px; width: 100%; object-fit: cover;">
					<p><strong>${car.manufacture} ${car.model}</strong></p>
					<h5>Rp ${car.rentPerDay.toLocaleString()} / hari</h5>
					<p>${car.description}</p>
					<div class="d-flex">
						<i class="bi bi-people"></i>
						<p class="ms-2">${car.capacity} Orang</p>
					</div>
					<div class="d-flex">
						<i class="bi bi-gear-wide-connected"></i>
						<p class="ms-2">${car.transmission}</p>
					</div>
					<div class="d-flex">
						<i class="bi bi-car-front-fill"></i>
					<p class="ms-2">${car.available ? 'Dengan Sopir' : 'Tanpa Sopir'}</p>
					</div>
					<div class="d-flex">
						<i class="bi bi-calendar"></i>
						<p class="ms-2">Tahun ${car.year}</p>
					</div>
					<div class="d-flex">
						<i class="bi bi-calendar-check"></i>
						<p class="ms-2">Tersedia pada ${car.availableAt.toLocaleDateString()}</p>
					</div>
				</div>
				<button type="submit" class="btn btn-success w-100">Pilih Mobil</button>
			</div>
		`;

	carContainer.innerHTML += carCard; // Tambahkan card mobil ke dalam container
};

// Fungsi untuk filter mobil berdasarkan input form
const filterCars = (cars, filter) => {
	return cars.filter(car => {
		const isCapacityMatch = !filter.capacityRequirement || car.capacity >= filter.capacityRequirement; // Cek kapasitas mobil
		const isAvailableAtMatch = !filter.availableAt || new Date(car.availableAt).toDateString() === filter.availableAt.toDateString(); // Cek tanggal ketersediaan
		const isDriverTypeMatch =
			filter.driverType === 'all' || // Cek tipe driver
			(filter.driverType === 'denganSopir' && car.available) ||
			(filter.driverType === 'tanpaSopir' && !car.available);

		// Kembalikan true jika semua syarat sesuai
		return isCapacityMatch && isAvailableAtMatch && isDriverTypeMatch;
	});
};

// Fungsi untuk menginisialisasi aplikasi
const init = async () => {
	const cars = await fetchCars(); // Ambil data mobil

	const form = document.querySelector('form');
	let previousFilter = null; // Simpan filter sebelumnya untuk pembanding

	// Event listener untuk submit form
	form.addEventListener('submit', event => {
		event.preventDefault();

		const capacityRequirement = parseInt(form.querySelector('#jumlahPenumpang').value); // Ambil input kapasitas
		const dateTime = form.querySelector('#datepicker').value; // Ambil input tanggal
		const date = new Date(dateTime); // Konversi input ke Date object
		const driverType = form.querySelector('#tipeDriver').value; // Ambil input tipe driver

		// Buat filter berdasarkan input form
		const filter = {
			capacityRequirement: isNaN(capacityRequirement) ? null : capacityRequirement,
			availableAt: date,
			driverType,
		};

		const carContainer = document.getElementById('car-container');
		carContainer.innerHTML = ''; // Kosongkan container sebelum menampilkan mobil baru

		// Filter mobil dan tampilkan yang sesuai
		const filteredCars = filterCars(cars, filter);
		filteredCars.forEach(car => renderCar(car));

		// Tampilkan pesan jika tidak ada mobil yang sesuai
		if (filteredCars.length === 0) {
			const noCarInfo = document.createElement('div');
			noCarInfo.className = 'alert alert-warning m-0';
			noCarInfo.innerHTML = 'Tidak ada mobil yang sesuai dengan filter Anda.';
			carContainer.prepend(noCarInfo);
		} else {
			// Tampilkan pesan apakah filter baru atau diubah
			const filterInfo = document.createElement('div');
			filterInfo.className = 'alert alert-info m-0';

			if (previousFilter && JSON.stringify(previousFilter) !== JSON.stringify(filter)) {
				filterInfo.innerHTML = `Filter berhasil diubah, Silahkan pilih mobil yang ingin anda sewa`;
			} else {
				filterInfo.innerHTML = `Filter berhasil ditambahkan, Silahkan pilih mobil yang ingin anda sewa`;
			}

			carContainer.prepend(filterInfo);
		}

		// Simpan filter sebagai filter sebelumnya
		previousFilter = { ...filter };
	});
};

// Jalankan init saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', init);
