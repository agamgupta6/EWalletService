package com.pichincha.domain;

public class FileData {
String fileName;
byte[] data;
public FileData() {
	// TODO Auto-generated constructor stub
}
public FileData(String fileName, byte[] data) {
	super();
	this.fileName = fileName;
	this.data = data;
}
public String getFileName() {
	return fileName;
}
public void setFileName(String fileName) {
	this.fileName = fileName;
}
public byte[] getData() {
	return data;
}
public void setData(byte[] data) {
	this.data = data;
}


}
