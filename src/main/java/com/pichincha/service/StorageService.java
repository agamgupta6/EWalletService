package com.pichincha.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.chemistry.opencmis.client.api.CmisObject;
import org.apache.chemistry.opencmis.client.api.Document;
import org.apache.chemistry.opencmis.client.api.Folder;
import org.apache.chemistry.opencmis.client.api.Repository;
import org.apache.chemistry.opencmis.client.api.Session;
import org.apache.chemistry.opencmis.client.api.SessionFactory;
import org.apache.chemistry.opencmis.client.runtime.SessionFactoryImpl;
import org.apache.chemistry.opencmis.commons.PropertyIds;
import org.apache.chemistry.opencmis.commons.SessionParameter;
import org.apache.chemistry.opencmis.commons.data.ContentStream;
import org.apache.chemistry.opencmis.commons.enums.BindingType;
import org.apache.chemistry.opencmis.commons.enums.VersioningState;
import org.apache.chemistry.opencmis.commons.exceptions.CmisNameConstraintViolationException;
import org.apache.chemistry.opencmis.commons.exceptions.CmisObjectNotFoundException;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class StorageService {

	private Session session;
	private String path = "/Documents/cmisrepo";

	public StorageService() {
		SessionFactory factory = SessionFactoryImpl.newInstance();
		Map<String, String> parameters = new HashMap<String, String>();

		// user credentials
		parameters.put(SessionParameter.USER, "test");
		parameters.put(SessionParameter.PASSWORD, "test");

		// connection settings
		parameters.put(SessionParameter.ATOMPUB_URL,
				"http://localhost:8585/chemistry-opencmis-server-fileshare-1.1.0/atom11");
		parameters.put(SessionParameter.BINDING_TYPE, BindingType.ATOMPUB.value());
		parameters.put(SessionParameter.REPOSITORY_ID, "test");

		// create session
		List<Repository> repositories = factory.getRepositories(parameters);
		this.session = repositories.get(0).createSession();

		// prepare properties
	}

	public Folder getUserFolder(String folderName) {
		Folder userFolder;
		try {
			userFolder = (Folder) this.session.getObjectByPath(this.path + "/" + folderName);
			return userFolder;
		} catch (CmisObjectNotFoundException e) {
			Folder rootFolder = (Folder) this.session.getObjectByPath(this.path);
			;
			Map<String, Object> properties = new HashMap<String, Object>();
			properties.put(PropertyIds.NAME, folderName);
			properties.put(PropertyIds.OBJECT_TYPE_ID, "cmis:folder");
			// create the folder
			userFolder = rootFolder.createFolder(properties);
			return userFolder;
		}

	}

	public String uploadFile(Folder userFolder, MultipartFile files, String fileName) throws IOException {

		// prepare content - a simple text file
		InputStream stream = files.getInputStream();
		ContentStream contentStream = session.getObjectFactory().createContentStream(files.getName(), files.getSize(),
				files.getContentType(), stream);

		// 	prepare properties
		Map<String, Object> properties = new HashMap<String, Object>();
		properties.put(PropertyIds.NAME, fileName);
		properties.put(PropertyIds.OBJECT_TYPE_ID, "cmis:document");
		Document newDoc = null;
		// create the document
		try {
			
			newDoc = userFolder.createDocument(properties, contentStream, VersioningState.NONE);
		} catch ( CmisNameConstraintViolationException e) {
			  Document olddocument = (Document) session.getObjectByPath(userFolder.getPath() + "/" + fileName);
			  olddocument.delete(true);
			  newDoc = userFolder.createDocument(properties, contentStream, VersioningState.NONE);
			}
		return newDoc.getId();
	}

	public byte[] getRepoFile(String id) throws IOException{
		CmisObject cmisObject = session.getObject(id);

		if (cmisObject instanceof Document) {
		    Document document = (Document) cmisObject;
		    ContentStream contentStream = document.getContentStream();
		    InputStream stream = contentStream.getStream();
		    return IOUtils.toByteArray(stream);
		} else {
			return null;
		}

		
	}
	
}
