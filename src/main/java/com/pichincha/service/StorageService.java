package com.pichincha.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.chemistry.opencmis.client.api.CmisObject;
import org.apache.chemistry.opencmis.client.api.Folder;
import org.apache.chemistry.opencmis.client.api.OperationContext;
import org.apache.chemistry.opencmis.client.api.Repository;
import org.apache.chemistry.opencmis.client.api.Session;
import org.apache.chemistry.opencmis.client.api.SessionFactory;
import org.apache.chemistry.opencmis.client.runtime.SessionFactoryImpl;
import org.apache.chemistry.opencmis.commons.PropertyIds;
import org.apache.chemistry.opencmis.commons.SessionParameter;
import org.apache.chemistry.opencmis.commons.enums.BindingType;
import org.apache.chemistry.opencmis.commons.enums.IncludeRelationships;

public class StorageService {
public static void main(String[] args) {
	// default factory implementation
	SessionFactory factory = SessionFactoryImpl.newInstance();
	Map<String, String> parameters = new HashMap<String, String>();

	// user credentials
	parameters.put(SessionParameter.USER, "test");
	parameters.put(SessionParameter.PASSWORD, "test");

	// connection settings
	parameters.put(SessionParameter.ATOMPUB_URL, "http://localhost:8585/chemistry-opencmis-server-fileshare-1.1.0/atom11");
	parameters.put(SessionParameter.BINDING_TYPE, BindingType.ATOMPUB.value());
	parameters.put(SessionParameter.REPOSITORY_ID, "test");

	// create session
	List<Repository> repositories = factory.getRepositories(parameters);
	Session session = repositories.get(0).createSession();
	String path = "/Documents/cmisrepo";
	CmisObject cmisObject = session.getObjectByPath(path);
	// prepare properties
	Folder rootFolder  = (Folder) cmisObject;
	String folderName  = "agam.gupta@tcs.com";
	if (null==session.getObjectByPath(path+"/"+folderName)) {
		Map<String, Object> properties = new HashMap<String, Object>();
		properties.put(PropertyIds.NAME, folderName);
		properties.put(PropertyIds.OBJECT_TYPE_ID, "cmis:folder");
		// create the folder
		Folder newFolder = rootFolder.createFolder(properties);
	} else {
		System.out.println("folder exist");
	}
	
	
}
}
