package com.pichincha.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.chemistry.opencmis.client.api.CmisObject;
import org.apache.chemistry.opencmis.client.api.Folder;
import org.apache.chemistry.opencmis.client.api.Repository;
import org.apache.chemistry.opencmis.client.api.Session;
import org.apache.chemistry.opencmis.client.api.SessionFactory;
import org.apache.chemistry.opencmis.client.runtime.SessionFactoryImpl;
import org.apache.chemistry.opencmis.commons.SessionParameter;
import org.apache.chemistry.opencmis.commons.enums.BindingType;

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
	Folder folder  = session.getRootFolder();
	for (CmisObject child: folder.getChildren()) {
	    System.out.println(child.getName());
	}
}
}
