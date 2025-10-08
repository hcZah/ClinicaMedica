-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema clinica_medica
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema clinica_medica
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `clinica_medica` DEFAULT CHARACTER SET utf8mb4 ;
USE `clinica_medica` ;

-- -----------------------------------------------------
-- Table `clinica_medica`.`tbusuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_medica`.`tbusuario` (
  `CdUsuario` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `NmUsuario` VARCHAR(200) NOT NULL,
  `CPF` VARCHAR(20) NOT NULL,
  `Email` VARCHAR(200) NOT NULL,
  `Senha` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`CdUsuario`));


-- -----------------------------------------------------
-- Table `clinica_medica`.`tbmedico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_medica`.`tbmedico` (
  `CRM` VARCHAR(9) NOT NULL,
  `tbusuario_CdUsuario` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`CRM`, `tbusuario_CdUsuario`),
  CONSTRAINT `fk_tbmedico_tbusuario1`
    FOREIGN KEY (`tbusuario_CdUsuario`)
    REFERENCES `clinica_medica`.`tbusuario` (`CdUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `clinica_medica`.`tbpaciente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_medica`.`tbpaciente` (
  `Endereco` VARCHAR(200) NULL,
  `Telefone` VARCHAR(20) NULL DEFAULT NULL,
  `CdUsuario` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`CdUsuario`),
  CONSTRAINT `fk_tbpaciente_tbusuario1`
    FOREIGN KEY (`CdUsuario`)
    REFERENCES `clinica_medica`.`tbusuario` (`CdUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `clinica_medica`.`tbagendamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_medica`.`tbagendamento` (
  `CdAgendamento` INT(11) NOT NULL AUTO_INCREMENT,
  `DtAgendamento` DATE NOT NULL,
  `HrAgendamento` TIME NOT NULL,
  `CRM` VARCHAR(9) NOT NULL,
  `CdPaciente` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`CdAgendamento`),
  CONSTRAINT `fk_tbagendamento_tbmedico1`
    FOREIGN KEY (`CRM`)
    REFERENCES `clinica_medica`.`tbmedico` (`CRM`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbagendamento_tbpaciente1`
    FOREIGN KEY (`CdPaciente`)
    REFERENCES `clinica_medica`.`tbpaciente` (`CdUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `clinica_medica`.`tbconsulta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_medica`.`tbconsulta` (
  `CdConsulta` INT(11) NOT NULL AUTO_INCREMENT,
  `Descricao` VARCHAR(500) NOT NULL,
  `CdAgendamento` INT(11) NOT NULL,
  PRIMARY KEY (`CdConsulta`),
  CONSTRAINT `tbconsulta_ibfk_1`
    FOREIGN KEY (`CdAgendamento`)
    REFERENCES `clinica_medica`.`tbagendamento` (`CdAgendamento`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `clinica_medica`.`tbespecialidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_medica`.`tbespecialidade` (
  `CdEspecialidade` INT(11) NOT NULL AUTO_INCREMENT,
  `NmEspecialidade` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`CdEspecialidade`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `clinica_medica`.`tbmedicoespecialidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_medica`.`tbmedicoespecialidade` (
  `RQE` INT(4) NOT NULL,
  `CRM` VARCHAR(9) NOT NULL,
  `CdEspecialidade` INT(11) NOT NULL,
  PRIMARY KEY (`CRM`, `CdEspecialidade`),
  CONSTRAINT `fk_tbmedicoespecialidade_tbmedico1`
    FOREIGN KEY (`CRM`)
    REFERENCES `clinica_medica`.`tbmedico` (`CRM`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbmedicoespecialidade_tbespecialidade1`
    FOREIGN KEY (`CdEspecialidade`)
    REFERENCES `clinica_medica`.`tbespecialidade` (`CdEspecialidade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `clinica_medica`.`tbsecretaria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_medica`.`tbsecretaria` (
  `CdSecretaria` INT(11) NOT NULL AUTO_INCREMENT,
  `NmSecretaria` VARCHAR(200) NOT NULL,
  `CPF` VARCHAR(20) NOT NULL,
  `Email` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`CdSecretaria`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `clinica_medica`.`TbFila`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_medica`.`TbFila` (
  `DtHrEntradaFila` DATETIME NOT NULL,
  `CdAgendamento` INT(11) NOT NULL,
  `CdPaciente` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`DtHrEntradaFila`),
  CONSTRAINT `fk_TbFila_tbagendamento1`
    FOREIGN KEY (`CdAgendamento`)
    REFERENCES `clinica_medica`.`tbagendamento` (`CdAgendamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TbFila_tbpaciente1`
    FOREIGN KEY (`CdPaciente`)
    REFERENCES `clinica_medica`.`tbpaciente` (`CdUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_medica`.`TbDisponibilidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_medica`.`TbDisponibilidade` (
  `CRM` VARCHAR(9) NOT NULL,
  `HrInicio` TIME NOT NULL,
  `HrFinal` TIME NOT NULL,
  `DiaSemana` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`CRM`),
  CONSTRAINT `fk_TbDisponibilidade_tbmedico1`
    FOREIGN KEY (`CRM`)
    REFERENCES `clinica_medica`.`tbmedico` (`CRM`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `clinica_medica` ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
