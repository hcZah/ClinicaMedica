-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2025 at 09:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clinica_medica`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbagendamento`
--

CREATE TABLE `tbagendamento` (
  `CdAgendamento` int(11) NOT NULL,
  `DtAgendamento` date NOT NULL,
  `HrAgendamento` time NOT NULL,
  `CdPaciente` int(11) NOT NULL,
  `CdMedico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbconsulta`
--

CREATE TABLE `tbconsulta` (
  `CdConsulta` int(11) NOT NULL,
  `Descricao` varchar(500) NOT NULL,
  `CdAgendamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbespecialidade`
--

CREATE TABLE `tbespecialidade` (
  `CdEspecialidade` int(11) NOT NULL,
  `NmEspecialidade` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbmedico`
--

CREATE TABLE `tbmedico` (
  `CdMedico` int(11) NOT NULL,
  `NmMedico` varchar(200) NOT NULL,
  `CPF` varchar(20) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Senha` varchar(20) NOT NULL,
  `Endereco` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbmedicoespecialidade`
--

CREATE TABLE `tbmedicoespecialidade` (
  `CdMedico` int(11) NOT NULL,
  `CdEspecialidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbpaciente`
--

CREATE TABLE `tbpaciente` (
  `CdPaciente` int(11) NOT NULL,
  `NmPaciente` varchar(200) NOT NULL,
  `CPF` varchar(20) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Senha` varchar(20) NOT NULL,
  `Endereco` varchar(200) NOT NULL,
  `Telefone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbsecretaria`
--

CREATE TABLE `tbsecretaria` (
  `CdSecretaria` int(11) NOT NULL,
  `NmSecretaria` varchar(200) NOT NULL,
  `CPF` varchar(20) NOT NULL,
  `Email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_agendamentodetalhado`
-- (See below for the actual view)
--
CREATE TABLE `vw_agendamentodetalhado` (
`CdAgendamento` int(11)
,`DtAgendamento` date
,`HrAgendamento` time
,`NmPaciente` varchar(200)
,`NmMedico` varchar(200)
);

-- --------------------------------------------------------

--
-- Structure for view `vw_agendamentodetalhado`
--
DROP TABLE IF EXISTS `vw_agendamentodetalhado`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_agendamentodetalhado`  AS SELECT `a`.`CdAgendamento` AS `CdAgendamento`, `a`.`DtAgendamento` AS `DtAgendamento`, `a`.`HrAgendamento` AS `HrAgendamento`, `p`.`NmPaciente` AS `NmPaciente`, `m`.`NmMedico` AS `NmMedico` FROM ((`tbagendamento` `a` join `tbpaciente` `p` on(`a`.`CdPaciente` = `p`.`CdPaciente`)) join `tbmedico` `m` on(`a`.`CdMedico` = `m`.`CdMedico`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbagendamento`
--
ALTER TABLE `tbagendamento`
  ADD PRIMARY KEY (`CdAgendamento`),
  ADD KEY `CdPaciente` (`CdPaciente`),
  ADD KEY `CdMedico` (`CdMedico`);

--
-- Indexes for table `tbconsulta`
--
ALTER TABLE `tbconsulta`
  ADD PRIMARY KEY (`CdConsulta`),
  ADD KEY `CdAgendamento` (`CdAgendamento`);

--
-- Indexes for table `tbespecialidade`
--
ALTER TABLE `tbespecialidade`
  ADD PRIMARY KEY (`CdEspecialidade`);

--
-- Indexes for table `tbmedico`
--
ALTER TABLE `tbmedico`
  ADD PRIMARY KEY (`CdMedico`);

--
-- Indexes for table `tbmedicoespecialidade`
--
ALTER TABLE `tbmedicoespecialidade`
  ADD KEY `CdMedico` (`CdMedico`),
  ADD KEY `CdEspecialidade` (`CdEspecialidade`);

--
-- Indexes for table `tbpaciente`
--
ALTER TABLE `tbpaciente`
  ADD PRIMARY KEY (`CdPaciente`);

--
-- Indexes for table `tbsecretaria`
--
ALTER TABLE `tbsecretaria`
  ADD PRIMARY KEY (`CdSecretaria`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbagendamento`
--
ALTER TABLE `tbagendamento`
  MODIFY `CdAgendamento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbconsulta`
--
ALTER TABLE `tbconsulta`
  MODIFY `CdConsulta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbespecialidade`
--
ALTER TABLE `tbespecialidade`
  MODIFY `CdEspecialidade` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbmedico`
--
ALTER TABLE `tbmedico`
  MODIFY `CdMedico` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbpaciente`
--
ALTER TABLE `tbpaciente`
  MODIFY `CdPaciente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbsecretaria`
--
ALTER TABLE `tbsecretaria`
  MODIFY `CdSecretaria` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbagendamento`
--
ALTER TABLE `tbagendamento`
  ADD CONSTRAINT `tbagendamento_ibfk_1` FOREIGN KEY (`CdPaciente`) REFERENCES `tbpaciente` (`CdPaciente`),
  ADD CONSTRAINT `tbagendamento_ibfk_2` FOREIGN KEY (`CdMedico`) REFERENCES `tbmedico` (`CdMedico`);

--
-- Constraints for table `tbconsulta`
--
ALTER TABLE `tbconsulta`
  ADD CONSTRAINT `tbconsulta_ibfk_1` FOREIGN KEY (`CdAgendamento`) REFERENCES `tbagendamento` (`CdAgendamento`);

--
-- Constraints for table `tbmedicoespecialidade`
--
ALTER TABLE `tbmedicoespecialidade`
  ADD CONSTRAINT `tbmedicoespecialidade_ibfk_1` FOREIGN KEY (`CdMedico`) REFERENCES `tbmedico` (`CdMedico`),
  ADD CONSTRAINT `tbmedicoespecialidade_ibfk_2` FOREIGN KEY (`CdEspecialidade`) REFERENCES `tbespecialidade` (`CdEspecialidade`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
