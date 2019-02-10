package com.pichincha.web.rest;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.UUID;

import javax.validation.Valid;

import org.apache.chemistry.opencmis.client.api.Folder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pichincha.domain.User;
import com.pichincha.domain.Wallet;
import com.pichincha.repository.TransactionRepository;
import com.pichincha.repository.WalletRepository;
import com.pichincha.security.SecurityUtils;
import com.pichincha.service.StorageService;
import com.pichincha.service.UserService;
import com.pichincha.web.rest.errors.BadRequestAlertException;
import com.pichincha.web.rest.util.HeaderUtil;
import com.pichincha.web.rest.vm.ManagedUserVM;

/**
 * REST controller for managing Transaction.
 */
@RestController
@RequestMapping("/api")
public class RegistrationResource {

    private final Logger log = LoggerFactory.getLogger(RegistrationResource.class);
    private final WalletRepository walletRepository;
    private final UserService userService;
    private final StorageService storageService;
    
    public RegistrationResource(TransactionRepository transactionRepository, 
    		UserService userService, StorageService storageService,
    		WalletRepository walletRepository) {
        this.userService = userService;
        this.storageService = storageService;
        this.walletRepository = walletRepository;
    }
    
    @PostMapping("/registerUser")
    @Timed
    public User createUser(@RequestParam("details") String  details) throws URISyntaxException, JsonParseException, JsonMappingException, IOException {
    	ObjectMapper objectMapper = new ObjectMapper();
    	ManagedUserVM managedUserVM  = objectMapper.readValue(details, ManagedUserVM.class);
    	
		User user = userService.registerUser(managedUserVM, managedUserVM.getPassword());
       return user;
    }
    
    @PostMapping("/uploadIdentityImage")
    @Timed
    public void uploadImage( 
    		@RequestParam("file") MultipartFile file,
    		@RequestParam("user") String user,
    		@RequestParam("fileName") String fileName) throws URISyntaxException, JsonParseException, JsonMappingException, IOException {
    	
    	Folder userFolder  = this.storageService.getUserFolder(user);
    	String fileId  = this.storageService.uploadFile(userFolder, file, fileName); 
    	log.debug("Uploaded file id: ", fileId);
        
       //return user;
    }
    
    /**
     * POST  /wallets : Create a new wallet.
     *
     * @param wallet the wallet to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wallet, or with status 400 (Bad Request) if the wallet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/createwallets")
    @Timed
    public ResponseEntity<Wallet> createWallet(@Valid @RequestBody Wallet wallet) throws URISyntaxException {
        log.debug("REST request to save Wallet : {}", wallet);
        if (wallet.getId() != null) {
            throw new BadRequestAlertException("A new wallet cannot already have an ID", "wallet", "idexists");
        }
        wallet.setNumber(UUID.randomUUID().toString());
        Wallet result = walletRepository.save(wallet);
        return ResponseEntity.created(new URI("/api/wallets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("wallet", result.getId().toString()))
            .body(result);
    }
    
}
