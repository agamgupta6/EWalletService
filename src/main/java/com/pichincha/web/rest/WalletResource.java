package com.pichincha.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pichincha.domain.Wallet;
import com.pichincha.repository.WalletRepository;
import com.pichincha.web.rest.errors.BadRequestAlertException;
import com.pichincha.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

import org.hibernate.id.GUIDGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * REST controller for managing Wallet.
 */
@RestController
@RequestMapping("/api")
public class WalletResource {

    private final Logger log = LoggerFactory.getLogger(WalletResource.class);

    private static final String ENTITY_NAME = "wallet";

    private final WalletRepository walletRepository;

    public WalletResource(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    /**
     * POST  /wallets : Create a new wallet.
     *
     * @param wallet the wallet to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wallet, or with status 400 (Bad Request) if the wallet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/wallets")
    @Timed
    public ResponseEntity<Wallet> createWallet(@Valid @RequestBody Wallet wallet) throws URISyntaxException {
        log.debug("REST request to save Wallet : {}", wallet);
        if (wallet.getId() != null) {
            throw new BadRequestAlertException("A new wallet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        wallet.setNumber(UUID.randomUUID().toString());
        Wallet result = walletRepository.save(wallet);
        return ResponseEntity.created(new URI("/api/wallets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /wallets : Updates an existing wallet.
     *
     * @param wallet the wallet to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wallet,
     * or with status 400 (Bad Request) if the wallet is not valid,
     * or with status 500 (Internal Server Error) if the wallet couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/wallets")
    @Timed
    public ResponseEntity<Wallet> updateWallet(@Valid @RequestBody Wallet wallet) throws URISyntaxException {
        log.debug("REST request to update Wallet : {}", wallet);
        if (wallet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Wallet result = walletRepository.save(wallet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, wallet.getId().toString()))
            .body(result);
    }

    /**
     * GET  /wallets : get all the wallets.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of wallets in body
     */
    @GetMapping("/wallets")
    @Timed
    public List<Wallet> getAllWallets() {
        log.debug("REST request to get all Wallets");
        return walletRepository.findAll();
    }

    /**
     * GET  /wallets/:id : get the "id" wallet.
     *
     * @param id the id of the wallet to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wallet, or with status 404 (Not Found)
     */
    @GetMapping("/wallets/{id}")
    @Timed
    public ResponseEntity<Wallet> getWallet(@PathVariable Long id) {
        log.debug("REST request to get Wallet : {}", id);
        Optional<Wallet> wallet = walletRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(wallet);
    }

    /**
     * DELETE  /wallets/:id : delete the "id" wallet.
     *
     * @param id the id of the wallet to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/wallets/{id}")
    @Timed
    public ResponseEntity<Void> deleteWallet(@PathVariable Long id) {
        log.debug("REST request to delete Wallet : {}", id);

        walletRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
