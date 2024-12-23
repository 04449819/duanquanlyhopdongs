create database QUANlYHOPDONG
GO
USE QUANlYHOPDONG
GO
CREATE TABLE HOPDONG
(
    Id INT IDENTITY PRIMARY KEY,
    HOPDONGID NVARCHAR(15),
    HoTenA NVARCHAR(255),
	HoTenB NVARCHAR(255),
	GMAILA NVARCHAR(255),
	GMAILB NVARCHAR(255),
    NOIDUNG NVARCHAR(50),
    NgayThayDoi DATETIME DEFAULT GETDATE()
)

go
CREATE TABLE HOPDONG_LICHSU (
    Id INT IDENTITY PRIMARY KEY,
    HOPDONGID NVARCHAR(15),
    HoTenA NVARCHAR(255),
    HoTenB NVARCHAR(255),
    GMAILA NVARCHAR(255),
    GMAILB NVARCHAR(255),
    NOIDUNG NVARCHAR(50),
    NgayThayDoi DATETIME DEFAULT GETDATE(),
    ThaoTac NVARCHAR(50)
);
go
CREATE TRIGGER TRG_HOPDONG_AUDIT
ON HOPDONG
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
 
    INSERT INTO HOPDONG_LICHSU (HOPDONGID, HoTenA, HoTenB, GMAILA, GMAILB, NOIDUNG, NgayThayDoi, ThaoTac)
    SELECT HOPDONGID, HoTenA, HoTenB, GMAILA, GMAILB, NOIDUNG, GETDATE(), 'INSERT'
    FROM inserted;

    
    INSERT INTO HOPDONG_LICHSU (HOPDONGID, HoTenA, HoTenB, GMAILA, GMAILB, NOIDUNG, NgayThayDoi, ThaoTac)
    SELECT HOPDONGID, HoTenA, HoTenB, GMAILA, GMAILB, NOIDUNG, GETDATE(), 'UPDATE'
    FROM inserted;


    INSERT INTO HOPDONG_LICHSU (HOPDONGID, HoTenA, HoTenB, GMAILA, GMAILB, NOIDUNG, NgayThayDoi, ThaoTac)
    SELECT HOPDONGID, HoTenA, HoTenB, GMAILA, GMAILB, NOIDUNG, GETDATE(), 'DELETE'
    FROM deleted;
END;




