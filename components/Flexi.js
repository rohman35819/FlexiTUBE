import React from "react";
import { supabase } from '../lib/supabaseClient'
const inputClass =
  "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

const FormSetelanMesin = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="p-6 max-w-5xl mx-auto bg-white rounded-2xl shadow">
        <h1 className="text-center text-2xl font-bold mb-6 text-blue-700">
          Form Setelan Mesin Injection
        </h1>

       <form id="Flexi" className="grid gap-6" onSubmit={handleSubmit}>

          <div>
            <label htmlFor="nama-produk" className="font-bold">
              Nama Produk:
            </label>
            <input
              type="text"
              id="nama-produk"
              name="nama_produk"
              placeholder="contoh K2SA JIS"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="jumlah-step" className="font-bold">
              Jumlah Step:
            </label>
            <select
              id="jumlah-step"
              name="jumlah_step"
              className={inputClass}
              defaultValue="5"
            >
              <option value="3">3 Step</option>
              <option value="4">4 Step</option>
              <option value="5">5 Step</option>
            </select>
          </div>

          <Section title="Injection SPD">{renderStepInputs("spd")}</Section>
          <Section title="PRS">{renderStepInputs("prs")}</Section>
          <Section title="MM">{renderStepInputs("mm")}</Section>

          <Section title="Holding">
            {renderDoubleInputs("holding_spd", "SPD")}
            {renderDoubleInputs("holding_prs", "PRS")}
            {renderDoubleInputs("holding_time", "Time", true)}
          </Section>

          <Section title="Waktu & Tahap Inject">
            {renderSingleInput("inject_delay_time", "Inject Delay Time")}
            {renderSingleInput("inject_time", "Inject Time")}
            {renderSelect("holding_prs_select", "Holding PRS Select", ["position", "time"])}
            {renderSingleInput("hold_tranf_prs", "Hold Transfer PRS")}
            {renderSingleInput("inject_stage_set", "Inject Stage Set")}
            {renderSingleInput("hold_stage_set", "Hold Stage Set")}
            {renderSelect("inject_gate_use", "Inject Gate Use", ["Yes", "No"], true)}
            {renderSelect("inject_fast_valve_use", "Inject Fast Valve Use", ["Yes", "No"], true)}
          </Section>

          <Section title="Charge & Suck">
            {renderMultiInputs("charge_suck_spd", "SPD", 4)}
            {renderMultiInputs("charge_suck_mm", "MM", 4)}
            {renderMultiInputs("charge_suck_bar", "BAR", 4)}
          </Section>

          <Section title="Suck Back">
            {renderDoubleInputs("suck_back_spd", "SPD")}
            {renderDoubleInputs("suck_back_pos", "Position")}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <label className="font-bold">BPRS</label>
              <div className="flex gap-4">
                <select name="suck_back_bprs1" className={inputClass}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <select name="suck_back_bprs2" className={inputClass}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </Section>

          <div>
            <label className="font-bold">Cooling Time:</label>
            <input type="number" name="cooling_time" className={inputClass} />
          </div>

          <Section title="Nozzle & Heater">
            {renderSingleInput("nozzle", "Nozzle")}
            {renderMultiInputs("heater", "Heater", 4)}
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="mtc1"
              placeholder="MTC 1"
              className={inputClass}
            />
            <input
              type="number"
              name="mtc2"
              placeholder="MTC 2"
              className={inputClass}
            />
          </div>

         <Section title="Hotrunner">
  {renderMultiInputs("hotrunner_channel_", "Channel", 10)}
</Section>

          <div>
            <label htmlFor="keterangan" className="font-bold">
              Keterangan Tambahan:
            </label>
            <textarea
              id="keterangan"
              name="keterangan"
              rows="4"
              placeholder="Isi keterangan tambahan di sini..."
              className={inputClass}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3 rounded-lg shadow"
            >
              Simpan Setelan
            </button>
            <button
              type="button"
              onClick={() => window.location.href = 'output.html'}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow"
            >
              DATA STELAN MESIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="p-4 bg-white rounded-2xl shadow border">
    <h2 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">
      {title}
    </h2>
    <div className="grid gap-4">{children}</div>
  </div>
);

const renderStepInputs = (name) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
    {[1, 2, 3, 4, 5].map((step) => (
      <input
        key={step}
        type="number"
        name={`${name}_${step}st`}
        placeholder={`${name}_${step}st`}
        className={inputClass}
      />
    ))}
  </div>
);

const renderDoubleInputs = (name, label, isDecimal = false) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
    <label className="font-bold md:col-span-1">{label}</label>
    <input
      type="number"
      name={`${name}1`}
      placeholder="1st"
      step={isDecimal ? "0.01" : undefined}
      className={inputClass}
    />
    <input
      type="number"
      name={`${name}2`}
      placeholder="2nd"
      step={isDecimal ? "0.01" : undefined}
      className={inputClass}
    />
  </div>
);

const renderSingleInput = (name, label) => (
  <div>
    <label className="font-bold">{label}:</label>
    <input type="number" name={name} className={inputClass} />
  </div>
);

const renderSelect = (name, label, options, withPlaceholder = false) => (
  <div>
    <label className="font-bold">{label}:</label>
    <select name={name} className={inputClass}>
      {withPlaceholder && <option value="">-- Pilih --</option>}
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const renderMultiInputs = (name, label, count) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
    {[...Array(count)].map((_, i) => (
      <input
        key={i}
        type="number"
        name={`${name}${i + 1}`}
        placeholder={`${label} ${i + 1}`}
        className={inputClass}
      />
    ))}
  </div>
);

export default FormSetelanMesin



// lalu pakai supabase untuk insert, read, dll

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const { error } = await supabase
    .from('notes') // pastikan ini nama tabel yang BENAR
    .insert([data]);

  if (error) {
    console.error('Error menyimpan:', error.message);
    alert('Gagal menyimpan data');
  } else {
    alert('Data berhasil disimpan!');
  }
};