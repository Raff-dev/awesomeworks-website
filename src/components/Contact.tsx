import { Box, Button, Card, Flex, Text, TextArea, TextField, Theme } from '@radix-ui/themes';
import { AtSign, Building2, CheckCircle, Mail, Send, User } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export function Contact() {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone (PhoneInput doesn't support required natively)
    if (!formData.phone || formData.phone.length < 8) {
      alert('Proszę podać prawidłowy numer telefonu');
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '96db43d4-48ed-482a-9186-a1527a1b7833',
          subject: `Nowa wiadomość od ${formData.name} - Awesome Works`,
          from_name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" style={{ minHeight: '100vh', overflow: 'auto', paddingBottom: '3rem' }} className="relative">
      <div style={{ maxWidth: '80rem', width: '100%', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <Theme appearance="dark" accentColor="iris" radius="large" style={{ background: 'transparent', paddingTop: '8rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left side - Info */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
                {t('contact.title')}
              </h2>
              <Text size="4" style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '2rem' }}>
                {t('contact.subtitle')}
              </Text>

              {/* Contact info */}
              <a
                href="mailto:hello@awesomeworks.ai"
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-muted)', textDecoration: 'none', marginBottom: '2rem' }}
              >
                <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={20} color="white" />
                </div>
                <span>hello@awesomeworks.ai</span>
              </a>

              {/* Social proof / trust */}
              <Card style={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <Text as="p" style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  "{t('contact.form.testimonial')}"
                </Text>
              </Card>
            </div>

            {/* Right side - Form */}
            <Card size="4" style={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                            <Text as="p" size="4" style={{ color: 'var(--color-primary)', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>
                              {t('contact.form.formTitle')}
                            </Text>
              {isSubmitted ? (
                <Flex direction="column" align="center" justify="center" style={{ padding: '3rem 0' }}>
                  <CheckCircle size={64} color="var(--color-secondary)" style={{ marginBottom: '1rem' }} />
                  <Text size="5" weight="bold" style={{ textAlign: 'center', color: 'white' }}>
                    {t('contact.form.success')}
                  </Text>
                </Flex>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Flex direction="column" gap="5">
                    {/* Name field */}
                    <Box>
                      <Text as="label" size="2" weight="medium" style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                        {t('contact.form.name')} *
                      </Text>
                      <TextField.Root
                        size="3"
                        placeholder={t('contact.form.namePlaceholder')}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ background: 'var(--color-background)' }}
                      >
                        <TextField.Slot>
                          <User size={16} color="var(--color-primary)" />
                        </TextField.Slot>
                      </TextField.Root>
                    </Box>

                    {/* Email field */}
                    <Box>
                      <Text as="label" size="2" weight="medium" style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                        {t('contact.form.email')} *
                      </Text>
                      <TextField.Root
                        size="3"
                        type="email"
                        placeholder={t('contact.form.emailPlaceholder')}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ background: 'var(--color-background)' }}
                      >
                        <TextField.Slot>
                          <AtSign size={16} color="var(--color-primary)" />
                        </TextField.Slot>
                      </TextField.Root>
                    </Box>

                    {/* Phone field */}
                    <Box>
                      <Text as="label" size="2" weight="medium" style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                        {t('contact.form.phone')} *
                      </Text>
                      <PhoneInput
                        defaultCountry="pl"
                        value={formData.phone}
                        onChange={(phone) => setFormData({ ...formData, phone })}
                        inputStyle={{
                          background: 'var(--color-background)',
                          border: '1px solid rgba(99, 102, 241, 0.3)',
                          borderRadius: '0 8px 8px 0',
                          color: 'white',
                          fontSize: '0.95rem',
                          height: '40px',
                          width: '100%',
                        }}
                        countrySelectorStyleProps={{
                          buttonStyle: {
                            background: 'var(--color-background)',
                            border: '1px solid rgba(99, 102, 241, 0.3)',
                            borderRadius: '8px 0 0 8px',
                            height: '40px',
                            padding: '0 8px',
                          },
                          dropdownStyleProps: {
                            style: {
                              background: 'var(--color-background)',
                              border: '1px solid rgba(99, 102, 241, 0.3)',
                              color: 'white',
                            },
                          },
                        }}
                      />
                    </Box>

                    {/* Company field */}
                    <Box>
                      <Text as="label" size="2" weight="medium" style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                        {t('contact.form.company')} *
                      </Text>
                      <TextField.Root
                        size="3"
                        placeholder={t('contact.form.companyPlaceholder')}
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        style={{ background: 'var(--color-background)' }}
                      >
                        <TextField.Slot>
                          <Building2 size={16} color="var(--color-primary)" />
                        </TextField.Slot>
                      </TextField.Root>
                    </Box>

                    {/* Message field */}
                    <Box>
                      <Text as="label" size="2" weight="medium" style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>
                        {t('contact.form.message')} * <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>({t('contact.form.minChars')})</span>
                      </Text>
                      <TextArea
                        size="3"
                        placeholder={t('contact.form.messagePlaceholder')}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        minLength={10}
                        rows={4}
                        style={{ background: 'var(--color-background)' }}
                      />
                    </Box>

                    {/* Submit button */}
                    <Button
                      size="3"
                      type="submit"
                      disabled={isLoading}
                      style={{
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                        cursor: isLoading ? 'wait' : 'pointer',
                        marginTop: '0.5rem',
                        opacity: isLoading ? 0.7 : 1,
                      }}
                    >
                      <Send size={18} />
                      {isLoading ? 'Wysyłanie...' : t('contact.form.submit')}
                    </Button>
                  </Flex>
                </form>
              )}
            </Card>
          </div>
        </Theme>
      </div>
    </section>
  );
}
