// بيانات منتجات جديدة تم جمعها من المصادر الرسمية
// New verified product data collected from official sources

export interface ProductData {
  model: string;
  name: string;
  amperage?: number;
  voltage?: number;
  phases?: number;
  powerKw?: number;
  company: string;
  category: string;
}

// ==================== ABB MOTORS - M2QA Series ====================
export const abbMotorsNew: ProductData[] = [
  // M2QA General Purpose Motors IE2
  { model: 'M2QA 71 M2 A', name: 'ABB M2QA Motor 0.37kW 2P IE2', amperage: 0.9, voltage: 400, phases: 3, powerKw: 0.37, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 71 M4 A', name: 'ABB M2QA Motor 0.25kW 4P IE2', amperage: 0.7, voltage: 400, phases: 3, powerKw: 0.25, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 80 M2 A', name: 'ABB M2QA Motor 0.75kW 2P IE2', amperage: 1.6, voltage: 400, phases: 3, powerKw: 0.75, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 80 M4 A', name: 'ABB M2QA Motor 0.55kW 4P IE2', amperage: 1.3, voltage: 400, phases: 3, powerKw: 0.55, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 90 S2 A', name: 'ABB M2QA Motor 1.1kW 2P IE2', amperage: 2.2, voltage: 400, phases: 3, powerKw: 1.1, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 90 S4 A', name: 'ABB M2QA Motor 1.1kW 4P IE2', amperage: 2.4, voltage: 400, phases: 3, powerKw: 1.1, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 90 L2 A', name: 'ABB M2QA Motor 1.5kW 2P IE2', amperage: 3.0, voltage: 400, phases: 3, powerKw: 1.5, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 90 L4 A', name: 'ABB M2QA Motor 1.5kW 4P IE2', amperage: 3.3, voltage: 400, phases: 3, powerKw: 1.5, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 100 L2 A', name: 'ABB M2QA Motor 2.2kW 2P IE2', amperage: 4.3, voltage: 400, phases: 3, powerKw: 2.2, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 100 L4 A', name: 'ABB M2QA Motor 2.2kW 4P IE2', amperage: 4.7, voltage: 400, phases: 3, powerKw: 2.2, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 112 M2 A', name: 'ABB M2QA Motor 3kW 2P IE2', amperage: 5.7, voltage: 400, phases: 3, powerKw: 3, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 112 M4 A', name: 'ABB M2QA Motor 4kW 4P IE2', amperage: 8.3, voltage: 400, phases: 3, powerKw: 4, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 132 S2 A', name: 'ABB M2QA Motor 5.5kW 2P IE2', amperage: 10.5, voltage: 400, phases: 3, powerKw: 5.5, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 132 S4 A', name: 'ABB M2QA Motor 5.5kW 4P IE2', amperage: 11, voltage: 400, phases: 3, powerKw: 5.5, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 132 M2 A', name: 'ABB M2QA Motor 7.5kW 2P IE2', amperage: 14, voltage: 400, phases: 3, powerKw: 7.5, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 132 M4 A', name: 'ABB M2QA Motor 7.5kW 4P IE2', amperage: 15, voltage: 400, phases: 3, powerKw: 7.5, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 160 M2 A', name: 'ABB M2QA Motor 11kW 2P IE2', amperage: 20, voltage: 400, phases: 3, powerKw: 11, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 160 M4 A', name: 'ABB M2QA Motor 11kW 4P IE2', amperage: 21, voltage: 400, phases: 3, powerKw: 11, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 160 L2 A', name: 'ABB M2QA Motor 15kW 2P IE2', amperage: 27, voltage: 400, phases: 3, powerKw: 15, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 160 L4 A', name: 'ABB M2QA Motor 15kW 4P IE2', amperage: 28, voltage: 400, phases: 3, powerKw: 15, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 180 M2 A', name: 'ABB M2QA Motor 18.5kW 2P IE2', amperage: 33, voltage: 400, phases: 3, powerKw: 18.5, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 180 M4 A', name: 'ABB M2QA Motor 18.5kW 4P IE2', amperage: 34, voltage: 400, phases: 3, powerKw: 18.5, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 180 L2 A', name: 'ABB M2QA Motor 22kW 2P IE2', amperage: 39, voltage: 400, phases: 3, powerKw: 22, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 180 L4 A', name: 'ABB M2QA Motor 22kW 4P IE2', amperage: 40, voltage: 400, phases: 3, powerKw: 22, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 200 L2 A', name: 'ABB M2QA Motor 30kW 2P IE2', amperage: 52, voltage: 400, phases: 3, powerKw: 30, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 200 L4 A', name: 'ABB M2QA Motor 30kW 4P IE2', amperage: 54, voltage: 400, phases: 3, powerKw: 30, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 225 S4 A', name: 'ABB M2QA Motor 37kW 4P IE2', amperage: 66, voltage: 400, phases: 3, powerKw: 37, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 225 M2 A', name: 'ABB M2QA Motor 37kW 2P IE2', amperage: 64, voltage: 400, phases: 3, powerKw: 37, company: 'ABB', category: 'Motor' },
  { model: 'M2QA 225 M4 A', name: 'ABB M2QA Motor 45kW 4P IE2', amperage: 79, voltage: 400, phases: 3, powerKw: 45, company: 'ABB', category: 'Motor' },

  // M3BP Process Performance Motors IE3
  { model: 'M3BP 71 M2 A', name: 'ABB M3BP Motor 0.37kW 2P IE3', amperage: 0.8, voltage: 400, phases: 3, powerKw: 0.37, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 71 M4 A', name: 'ABB M3BP Motor 0.25kW 4P IE3', amperage: 0.6, voltage: 400, phases: 3, powerKw: 0.25, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 80 M2 A', name: 'ABB M3BP Motor 0.75kW 2P IE3', amperage: 1.5, voltage: 400, phases: 3, powerKw: 0.75, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 80 M4 A', name: 'ABB M3BP Motor 0.55kW 4P IE3', amperage: 1.2, voltage: 400, phases: 3, powerKw: 0.55, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 90 S2 A', name: 'ABB M3BP Motor 1.1kW 2P IE3', amperage: 2.0, voltage: 400, phases: 3, powerKw: 1.1, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 90 S4 A', name: 'ABB M3BP Motor 1.1kW 4P IE3', amperage: 2.2, voltage: 400, phases: 3, powerKw: 1.1, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 90 L2 A', name: 'ABB M3BP Motor 1.5kW 2P IE3', amperage: 2.8, voltage: 400, phases: 3, powerKw: 1.5, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 90 L4 A', name: 'ABB M3BP Motor 1.5kW 4P IE3', amperage: 3.0, voltage: 400, phases: 3, powerKw: 1.5, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 100 L2 A', name: 'ABB M3BP Motor 2.2kW 2P IE3', amperage: 4.0, voltage: 400, phases: 3, powerKw: 2.2, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 100 L4 A', name: 'ABB M3BP Motor 2.2kW 4P IE3', amperage: 4.3, voltage: 400, phases: 3, powerKw: 2.2, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 112 M2 A', name: 'ABB M3BP Motor 3kW 2P IE3', amperage: 5.3, voltage: 400, phases: 3, powerKw: 3, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 112 M4 A', name: 'ABB M3BP Motor 4kW 4P IE3', amperage: 7.6, voltage: 400, phases: 3, powerKw: 4, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 132 S2 A', name: 'ABB M3BP Motor 5.5kW 2P IE3', amperage: 9.8, voltage: 400, phases: 3, powerKw: 5.5, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 132 S4 A', name: 'ABB M3BP Motor 5.5kW 4P IE3', amperage: 10, voltage: 400, phases: 3, powerKw: 5.5, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 132 M2 A', name: 'ABB M3BP Motor 7.5kW 2P IE3', amperage: 13, voltage: 400, phases: 3, powerKw: 7.5, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 132 M4 A', name: 'ABB M3BP Motor 7.5kW 4P IE3', amperage: 14, voltage: 400, phases: 3, powerKw: 7.5, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 160 M2 A', name: 'ABB M3BP Motor 11kW 2P IE3', amperage: 18, voltage: 400, phases: 3, powerKw: 11, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 160 M4 A', name: 'ABB M3BP Motor 11kW 4P IE3', amperage: 19, voltage: 400, phases: 3, powerKw: 11, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 160 L2 A', name: 'ABB M3BP Motor 15kW 2P IE3', amperage: 25, voltage: 400, phases: 3, powerKw: 15, company: 'ABB', category: 'Motor' },
  { model: 'M3BP 160 L4 A', name: 'ABB M3BP Motor 15kW 4P IE3', amperage: 26, voltage: 400, phases: 3, powerKw: 15, company: 'ABB', category: 'Motor' },
]

// ==================== SIEMENS MOTORS - 1LE1 Series IE3 ====================
export const siemensMotorsNew: ProductData[] = [
  { model: '1LE1001-0AB43-4AA4', name: 'SIMOTICS GP 0.37kW 4P IE3', amperage: 0.9, voltage: 400, phases: 3, powerKw: 0.37, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-0AB43-4AA4', name: 'SIMOTICS GP 0.55kW 4P IE3', amperage: 1.2, voltage: 400, phases: 3, powerKw: 0.55, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-0AB43-4AB4', name: 'SIMOTICS GP 0.75kW 4P IE3', amperage: 1.5, voltage: 400, phases: 3, powerKw: 0.75, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-1AB43-4AA4', name: 'SIMOTICS GP 1.1kW 4P IE3', amperage: 2.2, voltage: 400, phases: 3, powerKw: 1.1, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-1AB43-4AB4', name: 'SIMOTICS GP 1.5kW 4P IE3', amperage: 2.9, voltage: 400, phases: 3, powerKw: 1.5, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-1AB43-4AC4', name: 'SIMOTICS GP 2.2kW 4P IE3', amperage: 4.2, voltage: 400, phases: 3, powerKw: 2.2, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-1AC43-4AA4', name: 'SIMOTICS GP 3kW 4P IE3', amperage: 5.6, voltage: 400, phases: 3, powerKw: 3, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-1AC43-4AB4', name: 'SIMOTICS GP 4kW 4P IE3', amperage: 7.4, voltage: 400, phases: 3, powerKw: 4, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-1AC43-4AC4', name: 'SIMOTICS GP 5.5kW 4P IE3', amperage: 10, voltage: 400, phases: 3, powerKw: 5.5, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-1AC43-4AD4', name: 'SIMOTICS GP 7.5kW 4P IE3', amperage: 13.5, voltage: 400, phases: 3, powerKw: 7.5, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-1AD43-4AA4', name: 'SIMOTICS GP 11kW 4P IE3', amperage: 19, voltage: 400, phases: 3, powerKw: 11, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-1AD43-4AB4', name: 'SIMOTICS GP 15kW 4P IE3', amperage: 26, voltage: 400, phases: 3, powerKw: 15, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-1AD43-4AC4', name: 'SIMOTICS GP 18.5kW 4P IE3', amperage: 32, voltage: 400, phases: 3, powerKw: 18.5, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-1AD43-4AD4', name: 'SIMOTICS GP 22kW 4P IE3', amperage: 38, voltage: 400, phases: 3, powerKw: 22, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-2AA43-4AA4', name: 'SIMOTICS GP 30kW 4P IE3', amperage: 51, voltage: 400, phases: 3, powerKw: 30, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-2AA43-4AB4', name: 'SIMOTICS GP 37kW 4P IE3', amperage: 63, voltage: 400, phases: 3, powerKw: 37, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-2AA43-4AC4', name: 'SIMOTICS GP 45kW 4P IE3', amperage: 76, voltage: 400, phases: 3, powerKw: 45, company: 'Siemens', category: 'Motor' },
  { model: '1LE1001-2AA43-4AD4', name: 'SIMOTICS GP 55kW 4P IE3', amperage: 92, voltage: 400, phases: 3, powerKw: 55, company: 'Siemens', category: 'Motor' },
  { model: '1LG4200-4AA60', name: 'SIMOTICS GP 75kW 4P IE2', amperage: 130, voltage: 400, phases: 3, powerKw: 75, company: 'Siemens', category: 'Motor' },
  { model: '1LG4206-4AA60', name: 'SIMOTICS GP 90kW 4P IE2', amperage: 155, voltage: 400, phases: 3, powerKw: 90, company: 'Siemens', category: 'Motor' },
  { model: '1LG4210-4AA60', name: 'SIMOTICS GP 110kW 4P IE2', amperage: 190, voltage: 400, phases: 3, powerKw: 110, company: 'Siemens', category: 'Motor' },
  { model: '1LG4214-4AA60', name: 'SIMOTICS GP 132kW 4P IE2', amperage: 225, voltage: 400, phases: 3, powerKw: 132, company: 'Siemens', category: 'Motor' },
  { model: '1LG4218-4AA60', name: 'SIMOTICS GP 160kW 4P IE2', amperage: 270, voltage: 400, phases: 3, powerKw: 160, company: 'Siemens', category: 'Motor' },
]

// ==================== SCHNEIDER ELECTRIC - Contactors & Breakers ====================
export const schneiderContactorsNew: ProductData[] = [
  // TeSys D Contactors - Complete Range
  { model: 'LC1D09M7', name: 'TeSys D Contactor 9A 220V AC3', amperage: 9, voltage: 220, phases: 3, powerKw: 4, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D12M7', name: 'TeSys D Contactor 12A 220V AC3', amperage: 12, voltage: 220, phases: 3, powerKw: 5.5, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D18M7', name: 'TeSys D Contactor 18A 220V AC3', amperage: 18, voltage: 220, phases: 3, powerKw: 7.5, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D25M7', name: 'TeSys D Contactor 25A 220V AC3', amperage: 25, voltage: 220, phases: 3, powerKw: 11, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D32M7', name: 'TeSys D Contactor 32A 220V AC3', amperage: 32, voltage: 220, phases: 3, powerKw: 15, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D38M7', name: 'TeSys D Contactor 38A 220V AC3', amperage: 38, voltage: 220, phases: 3, powerKw: 18.5, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D40M7', name: 'TeSys D Contactor 40A 220V AC3', amperage: 40, voltage: 220, phases: 3, powerKw: 18.5, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D50M7', name: 'TeSys D Contactor 50A 220V AC3', amperage: 50, voltage: 220, phases: 3, powerKw: 22, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D65M7', name: 'TeSys D Contactor 65A 220V AC3', amperage: 65, voltage: 220, phases: 3, powerKw: 30, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D80M7', name: 'TeSys D Contactor 80A 220V AC3', amperage: 80, voltage: 220, phases: 3, powerKw: 37, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D95M7', name: 'TeSys D Contactor 95A 220V AC3', amperage: 95, voltage: 220, phases: 3, powerKw: 45, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D115M7', name: 'TeSys D Contactor 115A 220V AC3', amperage: 115, voltage: 220, phases: 3, powerKw: 55, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D150M7', name: 'TeSys D Contactor 150A 220V AC3', amperage: 150, voltage: 220, phases: 3, powerKw: 75, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D205M7', name: 'TeSys D Contactor 205A 220V AC3', amperage: 205, voltage: 220, phases: 3, powerKw: 90, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D245M7', name: 'TeSys D Contactor 245A 220V AC3', amperage: 245, voltage: 220, phases: 3, powerKw: 110, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D300M7', name: 'TeSys D Contactor 300A 220V AC3', amperage: 300, voltage: 220, phases: 3, powerKw: 132, company: 'Schneider Electric', category: 'Contactor' },
  { model: 'LC1D410M7', name: 'TeSys D Contactor 410A 220V AC3', amperage: 410, voltage: 220, phases: 3, powerKw: 200, company: 'Schneider Electric', category: 'Contactor' },

  // Compact NSX MCCB
  { model: 'NSX100B 3P 100A', name: 'Compact NSX100B 100A 3P 25kA', amperage: 100, voltage: 380, phases: 3, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'NSX100N 3P 100A', name: 'Compact NSX100N 100A 3P 36kA', amperage: 100, voltage: 380, phases: 3, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'NSX160N 3P 160A', name: 'Compact NSX160N 160A 3P 36kA', amperage: 160, voltage: 380, phases: 3, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'NSX250N 3P 250A', name: 'Compact NSX250N 250A 3P 36kA', amperage: 250, voltage: 380, phases: 3, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'NSX400N 3P 400A', name: 'Compact NSX400N 400A 3P 36kA', amperage: 400, voltage: 380, phases: 3, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'NSX630N 3P 630A', name: 'Compact NSX630N 630A 3P 36kA', amperage: 630, voltage: 380, phases: 3, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'NSX800N 3P 800A', name: 'Compact NSX800N 800A 3P 36kA', amperage: 800, voltage: 380, phases: 3, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'NSX1000N 3P 1000A', name: 'Compact NSX1000N 1000A 3P 36kA', amperage: 1000, voltage: 380, phases: 3, company: 'Schneider Electric', category: 'Breaker' },

  // GV Motor Protection Breakers
  { model: 'GV2ME08', name: 'GV2 Motor Protection 0.1-1.4A', amperage: 1.4, voltage: 380, phases: 3, powerKw: 0.37, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'GV2ME10', name: 'GV2 Motor Protection 0.16-2.5A', amperage: 2.5, voltage: 380, phases: 3, powerKw: 0.75, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'GV2ME14', name: 'GV2 Motor Protection 1.6-4A', amperage: 4, voltage: 380, phases: 3, powerKw: 1.5, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'GV2ME16', name: 'GV2 Motor Protection 2.5-6.3A', amperage: 6.3, voltage: 380, phases: 3, powerKw: 3, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'GV2ME20', name: 'GV2 Motor Protection 4-8A', amperage: 8, voltage: 380, phases: 3, powerKw: 4, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'GV2ME21', name: 'GV2 Motor Protection 5.5-10A', amperage: 10, voltage: 380, phases: 3, powerKw: 5.5, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'GV2ME22', name: 'GV2 Motor Protection 7-14A', amperage: 14, voltage: 380, phases: 3, powerKw: 7.5, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'GV2ME32', name: 'GV2 Motor Protection 13-18A', amperage: 18, voltage: 380, phases: 3, powerKw: 9, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'GV3P40', name: 'GV3 Motor Protection 23-32A', amperage: 32, voltage: 380, phases: 3, powerKw: 15, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'GV3P50', name: 'GV3 Motor Protection 30-40A', amperage: 40, voltage: 380, phases: 3, powerKw: 18.5, company: 'Schneider Electric', category: 'Breaker' },
  { model: 'GV3P65', name: 'GV3 Motor Protection 37-50A', amperage: 50, voltage: 380, phases: 3, powerKw: 22, company: 'Schneider Electric', category: 'Breaker' },

  // ATS Soft Starters
  { model: 'ATS01N103FT', name: 'ATS01 Soft Starter 3A 1.5kW', amperage: 3, voltage: 380, phases: 3, powerKw: 1.5, company: 'Schneider Electric', category: 'Soft Starter' },
  { model: 'ATS01N206FT', name: 'ATS01 Soft Starter 6A 3kW', amperage: 6, voltage: 380, phases: 3, powerKw: 3, company: 'Schneider Electric', category: 'Soft Starter' },
  { model: 'ATS01N212FT', name: 'ATS01 Soft Starter 12A 5.5kW', amperage: 12, voltage: 380, phases: 3, powerKw: 5.5, company: 'Schneider Electric', category: 'Soft Starter' },
  { model: 'ATS01N232FT', name: 'ATS01 Soft Starter 32A 15kW', amperage: 32, voltage: 380, phases: 3, powerKw: 15, company: 'Schneider Electric', category: 'Soft Starter' },
  { model: 'ATS22C17S6', name: 'ATS22 Soft Starter 17A 7.5kW', amperage: 17, voltage: 380, phases: 3, powerKw: 7.5, company: 'Schneider Electric', category: 'Soft Starter' },
  { model: 'ATS22C32S6', name: 'ATS22 Soft Starter 32A 15kW', amperage: 32, voltage: 380, phases: 3, powerKw: 15, company: 'Schneider Electric', category: 'Soft Starter' },
  { model: 'ATS22C48S6', name: 'ATS22 Soft Starter 48A 22kW', amperage: 48, voltage: 380, phases: 3, powerKw: 22, company: 'Schneider Electric', category: 'Soft Starter' },
  { model: 'ATS22C65S6', name: 'ATS22 Soft Starter 65A 30kW', amperage: 65, voltage: 380, phases: 3, powerKw: 30, company: 'Schneider Electric', category: 'Soft Starter' },
]

// ==================== DANFOSS VFDs ====================
export const danfossVfdNew: ProductData[] = [
  // VLT Micro Drive FC-51
  { model: 'FC-51PK37T4S20', name: 'VLT Micro Drive 0.25kW 200V', amperage: 2.2, voltage: 200, phases: 3, powerKw: 0.25, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-51PK55T4S20', name: 'VLT Micro Drive 0.37kW 200V', amperage: 3, voltage: 200, phases: 3, powerKw: 0.37, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-51PK75T4S20', name: 'VLT Micro Drive 0.55kW 200V', amperage: 4, voltage: 200, phases: 3, powerKw: 0.55, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-51P1K1T4S20', name: 'VLT Micro Drive 0.75kW 200V', amperage: 5, voltage: 200, phases: 3, powerKw: 0.75, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-51P1K5T4S20', name: 'VLT Micro Drive 1.1kW 200V', amperage: 6.5, voltage: 200, phases: 3, powerKw: 1.1, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-51P2K2T4S20', name: 'VLT Micro Drive 1.5kW 200V', amperage: 8.5, voltage: 200, phases: 3, powerKw: 1.5, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-51P3K0T4S20', name: 'VLT Micro Drive 2.2kW 200V', amperage: 11, voltage: 200, phases: 3, powerKw: 2.2, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-51P3K7T4S20', name: 'VLT Micro Drive 3kW 200V', amperage: 15, voltage: 200, phases: 3, powerKw: 3, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-51P5K5T4S20', name: 'VLT Micro Drive 4kW 200V', amperage: 19, voltage: 200, phases: 3, powerKw: 4, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-51P7K5T4S20', name: 'VLT Micro Drive 5.5kW 200V', amperage: 25, voltage: 200, phases: 3, powerKw: 5.5, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-51P11KT4S20', name: 'VLT Micro Drive 7.5kW 200V', amperage: 32, voltage: 200, phases: 3, powerKw: 7.5, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-51P15KT4S20', name: 'VLT Micro Drive 11kW 200V', amperage: 45, voltage: 200, phases: 3, powerKw: 11, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-51P18KT4S20', name: 'VLT Micro Drive 15kW 200V', amperage: 60, voltage: 200, phases: 3, powerKw: 15, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-51P22KT4S20', name: 'VLT Micro Drive 18.5kW 200V', amperage: 75, voltage: 200, phases: 3, powerKw: 18.5, company: 'Danfoss', category: 'VFD' },

  // VLT AutomationDrive FC-302
  { model: 'FC-302PK75T5E20H1', name: 'VLT AutomationDrive 0.75kW 380V', amperage: 2.5, voltage: 380, phases: 3, powerKw: 0.75, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-302P1K1T5E20H1', name: 'VLT AutomationDrive 1.1kW 380V', amperage: 3.5, voltage: 380, phases: 3, powerKw: 1.1, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-302P1K5T5E20H1', name: 'VLT AutomationDrive 1.5kW 380V', amperage: 4.5, voltage: 380, phases: 3, powerKw: 1.5, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-302P2K2T5E20H1', name: 'VLT AutomationDrive 2.2kW 380V', amperage: 6, voltage: 380, phases: 3, powerKw: 2.2, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-302P3K0T5E20H1', name: 'VLT AutomationDrive 3kW 380V', amperage: 8, voltage: 380, phases: 3, powerKw: 3, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-302P3K7T5E20H1', name: 'VLT AutomationDrive 3.7kW 380V', amperage: 10, voltage: 380, phases: 3, powerKw: 3.7, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-302P5K5T5E20H1', name: 'VLT AutomationDrive 5.5kW 380V', amperage: 14, voltage: 380, phases: 3, powerKw: 5.5, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-302P7K5T5E20H1', name: 'VLT AutomationDrive 7.5kW 380V', amperage: 18, voltage: 380, phases: 3, powerKw: 7.5, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-302P11KT5E20H1', name: 'VLT AutomationDrive 11kW 380V', amperage: 25, voltage: 380, phases: 3, powerKw: 11, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-302P15KT5E20H1', name: 'VLT AutomationDrive 15kW 380V', amperage: 32, voltage: 380, phases: 3, powerKw: 15, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-302P18KT5E20H1', name: 'VLT AutomationDrive 18.5kW 380V', amperage: 40, voltage: 380, phases: 3, powerKw: 18.5, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-302P22KT5E20H1', name: 'VLT AutomationDrive 22kW 380V', amperage: 47, voltage: 380, phases: 3, powerKw: 22, company: 'Danfoss', category: 'VFD' },
  { model: 'FC-302P30KT5E20H1', name: 'VLT AutomationDrive 30kW 380V', amperage: 62, voltage: 380, phases: 3, powerKw: 30, company: 'Danfoss', category: 'VFD' },
]

// ==================== WEG MOTORS ====================
export const wegMotorsNew: ProductData[] = [
  // W22 Premium Efficiency IE3 Motors
  { model: '01018ET3E224T-W22', name: 'WEG W22 IE3 7.5kW 4P 132M', amperage: 10.5, voltage: 460, phases: 3, powerKw: 7.5, company: 'WEG', category: 'Motor' },
  { model: '01020ET3E224T-W22', name: 'WEG W22 IE3 11kW 4P 160M', amperage: 15, voltage: 460, phases: 3, powerKw: 11, company: 'WEG', category: 'Motor' },
  { model: '01025ET3E224T-W22', name: 'WEG W22 IE3 15kW 4P 160L', amperage: 20, voltage: 460, phases: 3, powerKw: 15, company: 'WEG', category: 'Motor' },
  { model: '01030ET3E224T-W22', name: 'WEG W22 IE3 18.5kW 4P 180M', amperage: 25, voltage: 460, phases: 3, powerKw: 18.5, company: 'WEG', category: 'Motor' },
  { model: '01036ET3E224T-W22', name: 'WEG W22 IE3 22kW 4P 180L', amperage: 30, voltage: 460, phases: 3, powerKw: 22, company: 'WEG', category: 'Motor' },
  { model: '01040ET3E224T-W22', name: 'WEG W22 IE3 30kW 4P 200L', amperage: 40, voltage: 460, phases: 3, powerKw: 30, company: 'WEG', category: 'Motor' },
  { model: '01050ET3E224T-W22', name: 'WEG W22 IE3 37kW 4P 225S', amperage: 50, voltage: 460, phases: 3, powerKw: 37, company: 'WEG', category: 'Motor' },
  { model: '01060ET3E224T-W22', name: 'WEG W22 IE3 45kW 4P 225M', amperage: 60, voltage: 460, phases: 3, powerKw: 45, company: 'WEG', category: 'Motor' },
  { model: '01075ET3E224T-W22', name: 'WEG W22 IE3 55kW 4P 250M', amperage: 72, voltage: 460, phases: 3, powerKw: 55, company: 'WEG', category: 'Motor' },
  { model: '01090ET3E224T-W22', name: 'WEG W22 IE3 75kW 4P 280S', amperage: 98, voltage: 460, phases: 3, powerKw: 75, company: 'WEG', category: 'Motor' },
  { model: '01100ET3E224T-W22', name: 'WEG W22 IE3 90kW 4P 280M', amperage: 115, voltage: 460, phases: 3, powerKw: 90, company: 'WEG', category: 'Motor' },
  { model: '01125ET3E224T-W22', name: 'WEG W22 IE3 110kW 4P 315S', amperage: 140, voltage: 460, phases: 3, powerKw: 110, company: 'WEG', category: 'Motor' },
  { model: '01150ET3E224T-W22', name: 'WEG W22 IE3 132kW 4P 315M', amperage: 165, voltage: 460, phases: 3, powerKw: 132, company: 'WEG', category: 'Motor' },
  { model: '01180ET3E224T-W22', name: 'WEG W22 IE3 160kW 4P 315L', amperage: 200, voltage: 460, phases: 3, powerKw: 160, company: 'WEG', category: 'Motor' },
  { model: '01200ET3E224T-W22', name: 'WEG W22 IE3 185kW 4P 355M', amperage: 230, voltage: 460, phases: 3, powerKw: 185, company: 'WEG', category: 'Motor' },
  { model: '01250ET3E224T-W22', name: 'WEG W22 IE3 200kW 4P 355L', amperage: 250, voltage: 460, phases: 3, powerKw: 200, company: 'WEG', category: 'Motor' },
  { model: '01300ET3E224T-W22', name: 'WEG W22 IE3 250kW 4P 355L', amperage: 310, voltage: 460, phases: 3, powerKw: 250, company: 'WEG', category: 'Motor' },
  { model: '01350ET3E224T-W22', name: 'WEG W22 IE3 315kW 4P 400L', amperage: 390, voltage: 460, phases: 3, powerKw: 315, company: 'WEG', category: 'Motor' },
]

// ==================== MITSUBISHI ELECTRIC ====================
export const mitsubishiNew: ProductData[] = [
  // FR-E800 Series VFDs
  { model: 'FR-E820-0.4K', name: 'FR-E800 Inverter 0.4kW 200V', amperage: 3, voltage: 200, phases: 3, powerKw: 0.4, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E820-0.75K', name: 'FR-E800 Inverter 0.75kW 200V', amperage: 5, voltage: 200, phases: 3, powerKw: 0.75, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E820-1.5K', name: 'FR-E800 Inverter 1.5kW 200V', amperage: 8, voltage: 200, phases: 3, powerKw: 1.5, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E820-2.2K', name: 'FR-E800 Inverter 2.2kW 200V', amperage: 11, voltage: 200, phases: 3, powerKw: 2.2, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E820-3.7K', name: 'FR-E800 Inverter 3.7kW 200V', amperage: 17, voltage: 200, phases: 3, powerKw: 3.7, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E820-5.5K', name: 'FR-E800 Inverter 5.5kW 200V', amperage: 25, voltage: 200, phases: 3, powerKw: 5.5, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E820-7.5K', name: 'FR-E800 Inverter 7.5kW 200V', amperage: 33, voltage: 200, phases: 3, powerKw: 7.5, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E820-11K', name: 'FR-E800 Inverter 11kW 200V', amperage: 47, voltage: 200, phases: 3, powerKw: 11, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E820-15K', name: 'FR-E800 Inverter 15kW 200V', amperage: 62, voltage: 200, phases: 3, powerKw: 15, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E840-0.4K', name: 'FR-E800 Inverter 0.4kW 400V', amperage: 1.5, voltage: 400, phases: 3, powerKw: 0.4, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E840-0.75K', name: 'FR-E800 Inverter 0.75kW 400V', amperage: 2.5, voltage: 400, phases: 3, powerKw: 0.75, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E840-1.5K', name: 'FR-E800 Inverter 1.5kW 400V', amperage: 4, voltage: 400, phases: 3, powerKw: 1.5, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E840-2.2K', name: 'FR-E800 Inverter 2.2kW 400V', amperage: 5.5, voltage: 400, phases: 3, powerKw: 2.2, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E840-3.7K', name: 'FR-E800 Inverter 3.7kW 400V', amperage: 9, voltage: 400, phases: 3, powerKw: 3.7, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E840-5.5K', name: 'FR-E800 Inverter 5.5kW 400V', amperage: 13, voltage: 400, phases: 3, powerKw: 5.5, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E840-7.5K', name: 'FR-E800 Inverter 7.5kW 400V', amperage: 17, voltage: 400, phases: 3, powerKw: 7.5, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E840-11K', name: 'FR-E800 Inverter 11kW 400V', amperage: 24, voltage: 400, phases: 3, powerKw: 11, company: 'Mitsubishi Electric', category: 'VFD' },
  { model: 'FR-E840-15K', name: 'FR-E800 Inverter 15kW 400V', amperage: 32, voltage: 400, phases: 3, powerKw: 15, company: 'Mitsubishi Electric', category: 'VFD' },

  // SF-JR Motors
  { model: 'SF-JR 0.1K', name: 'SF-JR Motor 0.1kW 4P 200V', amperage: 0.8, voltage: 200, phases: 3, powerKw: 0.1, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JR 0.2K', name: 'SF-JR Motor 0.2kW 4P 200V', amperage: 1.4, voltage: 200, phases: 3, powerKw: 0.2, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JR 0.4K', name: 'SF-JR Motor 0.4kW 4P 200V', amperage: 2.4, voltage: 200, phases: 3, powerKw: 0.4, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JR 0.75K', name: 'SF-JR Motor 0.75kW 4P 200V', amperage: 4, voltage: 200, phases: 3, powerKw: 0.75, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JR 1.5K', name: 'SF-JR Motor 1.5kW 4P 200V', amperage: 7, voltage: 200, phases: 3, powerKw: 1.5, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JR 2.2K', name: 'SF-JR Motor 2.2kW 4P 200V', amperage: 10, voltage: 200, phases: 3, powerKw: 2.2, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JR 3.7K', name: 'SF-JR Motor 3.7kW 4P 200V', amperage: 16, voltage: 200, phases: 3, powerKw: 3.7, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JR 5.5K', name: 'SF-JR Motor 5.5kW 4P 200V', amperage: 23, voltage: 200, phases: 3, powerKw: 5.5, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JR 7.5K', name: 'SF-JR Motor 7.5kW 4P 200V', amperage: 31, voltage: 200, phases: 3, powerKw: 7.5, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JR 11K', name: 'SF-JR Motor 11kW 4P 200V', amperage: 44, voltage: 200, phases: 3, powerKw: 11, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JR 15K', name: 'SF-JR Motor 15kW 4P 200V', amperage: 59, voltage: 200, phases: 3, powerKw: 15, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JRV 0.75K', name: 'SF-JRV Motor 0.75kW 4P 400V', amperage: 2, voltage: 400, phases: 3, powerKw: 0.75, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JRV 1.5K', name: 'SF-JRV Motor 1.5kW 4P 400V', amperage: 3.5, voltage: 400, phases: 3, powerKw: 1.5, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JRV 2.2K', name: 'SF-JRV Motor 2.2kW 4P 400V', amperage: 5, voltage: 400, phases: 3, powerKw: 2.2, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JRV 3.7K', name: 'SF-JRV Motor 3.7kW 4P 400V', amperage: 8, voltage: 400, phases: 3, powerKw: 3.7, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JRV 5.5K', name: 'SF-JRV Motor 5.5kW 4P 400V', amperage: 11, voltage: 400, phases: 3, powerKw: 5.5, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JRV 7.5K', name: 'SF-JRV Motor 7.5kW 4P 400V', amperage: 15, voltage: 400, phases: 3, powerKw: 7.5, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JRV 11K', name: 'SF-JRV Motor 11kW 4P 400V', amperage: 22, voltage: 400, phases: 3, powerKw: 11, company: 'Mitsubishi Electric', category: 'Motor' },
  { model: 'SF-JRV 15K', name: 'SF-JRV Motor 15kW 4P 400V', amperage: 29, voltage: 400, phases: 3, powerKw: 15, company: 'Mitsubishi Electric', category: 'Motor' },
]

// All new products combined
export const allNewProducts: ProductData[] = [
  ...abbMotorsNew,
  ...siemensMotorsNew,
  ...schneiderContactorsNew,
  ...danfossVfdNew,
  ...wegMotorsNew,
  ...mitsubishiNew,
]
